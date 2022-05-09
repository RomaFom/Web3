import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Grid, Button, Table, Message } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import RequestRow from "../../../../components/RequestRow";
export default function Requests() {
  const router = useRouter();
  const { address } = router.query;
  const [requests, setRequests] = useState(null);
  const [approversCount, setApproversCount] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);
  const [approved, setApproved] = useState(false);
  const [requestCount, setRequestCount] = useState(null);

  useEffect(async () => {
    const campaign = Campaign(address);
    const requestsCount = await campaign.methods.getSummary().call();
    const summary = await campaign.methods.getSummary().call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount[2]))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    setApproversCount(summary[3]);
    setCampaign(campaign);
    setRequests(requests);
    setRequestCount(parseInt(requestsCount[2]));
  }, [approved]);

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          address={address}
          request={request}
          approversCount={approversCount}
          campaign={campaign}
          setError={setError}
          approved={approved}
          setApproved={setApproved}
        />
      );
    });
  };

  const errorMsg = () => {
    return (
      <Message negative>
        <Message.Header>Oops!</Message.Header>
        <p>{error}</p>
      </Message>
    );
  };
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {requests && <Table.Body>{renderRows()}</Table.Body>}
      </Table>
      <div>Found {requestCount} requests</div>
      {error && errorMsg()}
    </Layout>
  );
}
