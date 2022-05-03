// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory{
    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        Campaign newCampaign=new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (Campaign[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    mapping (uint => Request) public requests;

    uint public numRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;
    constructor(uint minimum,address creator){
        manager=creator;
        minimumContribution=minimum;
        numRequests=0;
        approversCount=0;
    }

    function contribute() public payable{
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description,uint value,address payable recipient) public rescticted{
        Request storage newRequest = requests[numRequests++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]=true;
        request.approvalCount++;
    }
    function finalizeRequest(uint index) public payable rescticted{
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount>(approversCount/2));
        request.recipient.transfer(request.value);
        request.complete=true;
    }

    modifier rescticted(){
        require(msg.sender==manager);
        _;
    }
}