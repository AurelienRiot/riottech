import ky from "ky";
import { z } from "zod";

const fetchResponceSchema = z.object({
  features: z.array(
    z.object({
      geometry: z.object({
        coordinates: z.array(z.number()),
        type: z.literal("Point"),
      }),
      properties: z.object({
        label: z.string(),
        id: z.string(),
        type: z.string(),
        name: z.string(),
        postcode: z.string(),
        citycode: z.string(),
        x: z.number(),
        y: z.number(),
        city: z.string(),
        context: z.string(),
        importance: z.number(),
      }),
    }),
  ),
});

export type Suggestion = {
  label: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
};

function sanitizeQuery(input: string) {
  let sanitized = input.trim().replace(/^-+/, "");
  sanitized = sanitized.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ");
  return sanitized;
}

const AddressAutocomplete = async (value: string) => {
  const trimmedValue = value.trim();
  if (trimmedValue.length < 3) return [] as Suggestion[];
  console.log(
    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(sanitizeQuery(value))}&autocomplete=1&limit=10`,
  );
  try {
    const response = await ky
      .get(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(sanitizeQuery(value))}&autocomplete=1&limit=10`,
      )
      .json();

    const { features } = await fetchResponceSchema.parse(response);
    const suggestions = features.map((feature) => ({
      label: feature.properties.label,
      city: feature.properties.city,
      country: "FR",
      line1: feature.properties.name,
      postal_code: feature.properties.postcode,
      state: feature.properties.context.split(", ").at(-1),
    }));
    return suggestions as Suggestion[];
  } catch (error) {
    return [];
  }
};

export default AddressAutocomplete;
