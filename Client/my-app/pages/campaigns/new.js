import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
export default function newCampaign() {
  const [min, setMin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setLoading(true);
      setError(null);
      await factory.methods.createCampaign(min).send({
        from: accounts[0],
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
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
      <h3>Create a Campaign</h3>

      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="Wei"
            labelPosition="right"
            value={min}
            style={{ width: "30%" }}
            onChange={(e) => setMin(e.target.value)}
          />
        </Form.Field>
        {error && errorMsg()}
        {!loading && (
          <Button onClick={onSubmit} primary>
            Create
          </Button>
        )}
        {loading && (
          <Button primary loading>
            Loading
          </Button>
        )}
      </Form>
    </Layout>
  );
}
