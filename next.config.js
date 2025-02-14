/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.fr-par.scw.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     sharp$: false,
  //     "onnxruntime-node$": false,
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;
