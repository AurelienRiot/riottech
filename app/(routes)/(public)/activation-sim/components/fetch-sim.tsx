import axios from "axios";

export type ValidSim = {
  RTsubIDs: string[];
  available: boolean;
  group: string;
  is_third: boolean;
  org_image_url: string;
  org_name: string;
  sim_serial: string;
};

export const FetchSim = async (sim: string): Promise<ValidSim> => {
  try {
    const response = await axios.get(
      `https://webtool.riottech.fr/public_routes/netsim/getSimAvailability/${sim}`
    );
    if (response.data.available) {
      //   return response.data as ValidSim;
      return {
        RTsubIDs: [
          "8a534334-0932-400b-b241-265d779bb997",
          "4893e883-a4c1-495f-a839-d37f61aba2ef",
          "9b2da012-1558-449e-a58b-74f20b35de9f",
          "ed8d0205-d50d-4ed0-a06c-f8cae6a81b66",
        ],
        available: true,
        group: "entreprisetest1_RT",
        is_third: true,
        org_image_url:
          "https://www.securiforce.fr/images/logo-SecuriForce-triangle-63x70.png",
        org_name: "Entreprise TEST1",
        sim_serial: "8988247000014274683",
      };
    }
    return {
      RTsubIDs: [],
      available: false,
      group: "",
      is_third: false,
      org_image_url: "",
      org_name: "",
      sim_serial: "",
    };
  } catch (error) {
    return {
      RTsubIDs: [],
      available: false,
      group: "",
      is_third: false,
      org_image_url: "",
      org_name: "",
      sim_serial: "",
    };
  }
};
