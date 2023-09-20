import GetBillboard from "@/server-actions/get-billboard";
import Client from "./components/client";
import NotFound from "@/app/not-found";

const AnomalyDetecPage: React.FC = async () => {
  const billboard = await GetBillboard(
    process.env.BILLBOARD_ANOMALY_DETECT as string
  );

  if (!billboard) {
    return <NotFound />;
  }

  return <Client billboard={billboard} />;
};

export default AnomalyDetecPage;
