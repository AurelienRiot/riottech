import Client from "./components/client";
import NotFound from "@/app/not-found";

const AnomalyDetecPage: React.FC = async () => {
    // const billboard = await GetBillboard(
    //   process.env.BILLBOARD_ANOMALY_DETECT as string
    // );

    const billboard = {
        id: "a30cc1e9-c548-478e-9cda-42a52f494a6d",
        label: "Anomaly Detect",
        imageUrl:
            "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341216/iacju0kobt6wd2rodnrv.png",
        createdAt: new Date("2023-07-14T13:27:02.067Z"),
        updatedAt: new Date("2023-07-22T16:52:11.360Z"),
    };

    if (!billboard) {
        return <NotFound />;
    }

    return <Client billboard={billboard} />;
};

export default AnomalyDetecPage;
