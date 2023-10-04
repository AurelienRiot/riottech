import axios from "axios";

const GetValideVat = async (
  vat: string
): Promise<false | { name: string; address: string }> => {
  if (vat.length >= 2) {
    const countryCode = vat.slice(0, 2);
    const vatNumber = vat.slice(2);
    try {
      const vatValidationResult = await axios.post(`/api/validationVat`, {
        countryCode: countryCode,
        vatNumber: vatNumber,
      });
      if (vatValidationResult.data.isValid === "true") {
        return {
          name: vatValidationResult.data.name,
          address: vatValidationResult.data.address,
        };
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

export default GetValideVat;
