
interface Feature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; 
  };
  properties: {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    type: 'housenumber';
    name: string; 
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string; 
    context: string;
    importance: number;
    street: string;
  };
}




const AddressAutocomplete = async (value: string) => {

    if (value.length < 3) return [];

    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
        value
      )}&autocomplete=1`
    );
    const data = await response.json();
    const features = data.features;
    const suggestions = features.map((feature : Feature) => ({
      label: feature.properties.label,
      city: feature.properties.city,
      country: "fr",
      line1: feature.properties.name,
      postal_code: feature.properties.postcode,
      state: feature.properties.context.split(', ').at(-1),
    }));
  return (suggestions  );
};

export default AddressAutocomplete;
