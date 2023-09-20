import React from "react";
import GetBillboard from "@/server-actions/get-billboard";
import Client from "./components/client";

const SurveillanceElevage = async () => {
  const billboard = await GetBillboard(
    process.env.BILLBOARD_SURVEILLANCE_ELEVAGE as string
  );

  return <Client billboard={billboard} />;
};

export default SurveillanceElevage;
