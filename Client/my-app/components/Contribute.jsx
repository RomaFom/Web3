import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
export default function Contribute(props) {
  const [donation, setDonation] = useState("");
  const { address, refresh, setRefresh } = props;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    console.log(donation);
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      setError(false);
      setLoading(true);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(donation, "ether"),
      });
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
    <>
      <Form>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={donation}
            style={{ width: "30%" }}
            onChange={(e) => setDonation(e.target.value)}
          />
        </Form.Field>
        {error && errorMsg()}
        {!loading && (
          <Button primary onClick={onSubmit}>
            Contribute
          </Button>
        )}
        {loading && (
          <Button primary loading>
            Loading
          </Button>
        )}
      </Form>
    </>
  );
}
