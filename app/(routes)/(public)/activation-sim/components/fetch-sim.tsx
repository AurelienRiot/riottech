import ky, { type HTTPError } from "ky";
import { unstable_cache } from "next/cache";

export type FetchSimType = {
  RTsubIDs: string[];
  available: boolean;
  group: string;
  is_third: boolean;
  org_image_url: string;
  org_name: string;
  sim_serial: string;
};

export const FetchSim = async (sim: string): Promise<FetchSimType> => {
  if (!sim) {
    return emptySIM;
  }

  if (!/^\d{19}$/.test(sim)) {
    return emptySIM;
  }

  if (sim.startsWith("89352")) {
    return {
      RTsubIDs: ["4d78ed3c-5f8f-47f8-af61-018e1bbcdc07"],
      available: true,
      group: "riottech_RT",
      is_third: false,
      org_image_url: "https://riottech.fr/_next/image?url=%2Ficone.png&w=3840&q=75",
      org_name: "RIOT TECH",
      sim_serial: sim,
    } satisfies FetchSimType;
  }
  // return {
  //   RTsubIDs: ["3fdbe87f-0d24-4a4b-8412-2390131a2dc8", "70ba8046-d4b4-4a95-9a4e-2155a3d181bd"],
  //   available: true,
  //   group: "",
  //   is_third: false,
  //   org_image_url: "",
  //   org_name: "",
  //   sim_serial: "",
  // };
  try {
    if (process.env.NODE_ENV === "development") {
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
        org_image_url: "https://www.securiforce.fr/wp-content/uploads/2024/06/logo-securiforce-noir.png",
        org_name: "Entreprise TEST1",
        sim_serial: "8988247000014274683",
      };
    }
    const baseUrl = process.env.HUB_RT_BASE_URL as string;
    const data = await ky
      .get(`${baseUrl}/public_routes/netsim/getSimAvailability/${sim}`)
      .json<FetchSimType>();
      
    if (data.available) {
      return data;
    }

    return emptySIM;
  } catch (error) {
    const kyError = error as HTTPError;
    const res = await kyError.response.json();
    console.log(res);
    return emptySIM;
  }
};

export const FetchSimCache = unstable_cache(async (sim: string) => FetchSim(sim), ["sim"], {
  revalidate: 60 * 10,
});

const emptySIM = {
  RTsubIDs: [],
  available: false,
  group: "",
  is_third: false,
  org_image_url: "",
  org_name: "",
  sim_serial: "",
};
