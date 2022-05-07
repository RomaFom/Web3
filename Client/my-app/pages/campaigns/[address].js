import { useRouter } from "next/router";
import Layout from "../../components/Layout";
export default function CampaignData() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <Layout>
      <h3>Campaign Data</h3>
      <p>{address}</p>
    </Layout>
  );
}
