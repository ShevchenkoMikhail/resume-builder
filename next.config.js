/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    experimental: {
        appDir: true,
    },
    // для next-auth
    webpack: (config) => {
        config.externals = [...config.externals, 'mongodb'];
        return config;
    },
}

module.exports = nextConfig;