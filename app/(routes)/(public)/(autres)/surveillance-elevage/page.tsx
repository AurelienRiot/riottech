import React from "react";
import Client from "./components/client";

const SurveillanceElevage = async () => {
    // const billboard = await GetBillboard(
    //     process.env.BILLBOARD_SURVEILLANCE_ELEVAGE as string,
    // );
    const billboard = {
        id: "2783d79e-3b2e-4802-98b0-dbf7cb03ca9e",
        label: "Surveillance Èlevage",
        imageUrl:
            "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341146/clwou7gpxkizqe6d9c9u.png",
        createdAt: new Date("2023-07-14T13:25:58.603Z"),
        updatedAt: new Date("2023-07-22T16:51:52.736Z"),
    };

    return <Client billboard={billboard} />;
};

export default SurveillanceElevage;
