import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import factory from "../ethereum/factory";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
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
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    setItems(items);
  }, [campaigns]);

  const getCampaign = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    setCampaigns((oldcampaigns) => [...oldcampaigns, campaigns[0]]);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h3>Open Campaigns</h3>

        <Button floated="right" icon labelPosition="right" primary="true">
          Add Campaign
          <Icon name="add" />
        </Button>
        {items && <Card.Group items={items} />}
      </div>
    </Layout>
  );
}
