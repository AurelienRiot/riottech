import ky from "ky";

const GetValideVat = async (vat: string): Promise<false | { name: string; address: string }> => {
  if (vat.length < 10) {
    return false;
  }

  const countryCode = vat.slice(0, 2);
  const vatNumber = vat.slice(2);
  try {
    const vatValidationResult = await ky.post("/api/validationVat", { json: { countryCode, vatNumber } }).json<{
      requestDate: string;
      isValid: string;
      name: string;
      address: string;
    }>();
    if (vatValidationResult.isValid === "true") {
      return {
        name: vatValidationResult.name,
        address: vatValidationResult.address,
      };
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default GetValideVat;
