import axios from "axios";

const GetValideVat = async (
  vat: string,
): Promise<false | { name: string; address: string }> => {
  if (vat.length < 10) {
    return false;
  }

  const countryCode = vat.slice(0, 2);
  const vatNumber = vat.slice(2);
  try {
    const vatValidationResult = await axios.post("/api/validationVat", {
      countryCode,
      vatNumber,
    });
    if (vatValidationResult.data.isValid === "true") {
      return {
        name: vatValidationResult.data.name,
        address: vatValidationResult.data.address,
      };
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default GetValideVat;
