const baseUrl = "https://riottech.fr";
export default async function sitemap() {
  return [
    {
      url: { baseUrl },
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/activation-sim`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/anomaly-detect`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/demo-cam`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solution-internet`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/surveillance-elevage`,
      lastModified: new Date(),
    },
  ];
}
