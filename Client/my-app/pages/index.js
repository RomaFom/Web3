import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import factory from "../ethereum/factory";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";
export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [items, setItems] = useState(null);
  useEffect(() => {
    getCampaign();
  }, []);

  useEffect(() => {
    const items = campaigns.map((campaign) => {
      return {
        header: campaign,
        description: (
          <Link href={`/campaigns/${campaign}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    setItems(items);
  }, [campaigns]);

  const getCampaign = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    setCampaigns(campaigns);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h3>Open Campaigns</h3>
        <Link href="campaigns/new">
          <a>
            <Button floated="right" icon labelPosition="right" primary="true">
              Add Campaign
              <Icon name="add" />
            </Button>
          </a>
        </Link>
        {items && <Card.Group items={items} />}
      </div>
    </Layout>
  );
}
