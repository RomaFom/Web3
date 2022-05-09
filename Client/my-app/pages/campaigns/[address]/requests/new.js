import { useState } from "react";
import Layout from "../../../../components/Layout";
import { Grid, Button, Form, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router";

export default function RequestIndex() {
  const router = useRouter();
  const { address } = router.query;
  const [value, setValue] = useState("");
  const [desc, setDesc] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      setError(null);
      setLoading(true);
      await campaign.methods
        .createRequest(desc, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      setLoading(false);
      router.push("/campaigns/" + address);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
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
      <h3>Create Request</h3>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
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
