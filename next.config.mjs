/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules/**', 'C:DumpStack.log.tmp', 'C:hiberfil.sys', 'C:pagefile.sys', 'C:swapfile.sys'],
    };
    return config;
  },
};

export default nextConfig;
