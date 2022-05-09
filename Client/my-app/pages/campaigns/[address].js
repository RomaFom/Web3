import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { useState, useEffect } from "react";
import { Card, Grid, Image, Button, Icon } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Contribute from "../../components/Contribute";

export default function CampaignData() {
  const router = useRouter();
  const { address } = router.query;
  const [min, setMin] = useState(null);
  const [balance, setBalance] = useState(null);
  const [requests, setRequests] = useState(null);
  const [approvals, setApprovals] = useState(null);
  const [manager, setManager] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    const camp = Campaign(address);
    const summary = await camp.methods.getSummary().call();
    setMin(summary[0]);
    setBalance(summary[1]);
    setRequests(summary[2]);
    setApprovals(summary[3]);
    setManager(summary[4]);
  }, [refresh]);

  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "The manager of this campaign can create requests",
        style: { overflowWrap: "break-word" },
      },
      {
        header: min,
        meta: "Minimum Contribution (Wei)",
        description:
          "The minimum contribution required to contribute to this campaign",
      },
      {
        header: requests,
        meta: "Number of Requests",
        description: "The number of requests tries to withdraw money",
      },
      {
        header: approvals,
        meta: "Number of Approvals",
        description: "The number of people who donated this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (Ether)",
        description: "The balance of this campaign",
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Data</h3>

      <Grid>
        <Grid.Column width={10}>
          {balance && renderCards()}
          <Link href={`/campaigns/${address}/requests`}>
            <a>
              <Button primary>View requests</Button>
            </a>
          </Link>
        </Grid.Column>

        <Grid.Column width={6}>
          <Contribute
            address={address}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Grid.Column>
      </Grid>
    </Layout>
  );
}
