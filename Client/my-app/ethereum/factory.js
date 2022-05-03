import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x36c43774a3cBEb63ad0E42416E7876D24879Fb04"
);

export default instance;
