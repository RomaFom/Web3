import { useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import web3 from "../ethereum/web3";
export default function RequestRow(props) {
  const { campaign, setError, approved, setApproved } = props;
  const [approving, setApproving] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const readyToFinalize =
    props.request.approvalCount > props.approversCount / 2;
  const onApprove = async () => {
    try {
      setError(null);
      setApproving(true);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .approveRequest(props.id)
        .send({ from: accounts[0] });
      setApproving(false);
      setApproved(!approved);
    } catch (error) {
      setError(error.message);
      setApproving(false);
      console.log(error);
    }
  };

  const onFinalize = async () => {
    try {
      setError(null);
      setFinalizing(true);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .finalizeRequest(props.id)
        .send({ from: accounts[0] });
      setFinalizing(false);
      setApproved(!approved);
    } catch (error) {
      setError(error.message);
      setFinalizing(false);
      console.log(error);
    }
  };

  return (
    <>
      <Table.Row
        disabled={props.request.complete}
        positive={readyToFinalize && !props.request.complete}
      >
        <Table.Cell>{props.id}</Table.Cell>
        <Table.Cell>{props.request.description}</Table.Cell>
        <Table.Cell>
          {web3.utils.fromWei(props.request.value, "ether")}
        </Table.Cell>
        <Table.Cell>{props.address}</Table.Cell>
        <Table.Cell>
          {props.request.approvalCount}/{props.approversCount}
        </Table.Cell>
        <Table.Cell>
          {!approving && props.request.complete ? null : (
            <Button color="green" basic onClick={onApprove}>
              Approve
            </Button>
          )}
          {approving && (
            <Button color="green" basic loading>
              Loading
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>
          {!finalizing && props.request.complete ? (
            <Icon name="check square" size="large" inverted color="green" />
          ) : (
            <Button color="teal" basic onClick={onFinalize}>
              Finalize
            </Button>
          )}

          {finalizing && (
            <Button color="teal" basic loading onClick={onFinalize}>
              Finalize
            </Button>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
}
// {
//   error && errorMsg();
// }
// {
//   !loading && (
//     <Button onClick={onSubmit} primary>
//       Create
//     </Button>
//   );
// }
// {
//   loading && (
//     <Button primary loading>
//       Loading
//     </Button>
//   );
// }
