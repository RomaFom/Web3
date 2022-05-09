import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x41aDb89350220a4C8D74FC1bDD0084d13b3d41FC"
);

export default instance;
