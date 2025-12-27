/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*', // This points to the Vercel functions directory
            },
        ];
    },
};

module.exports = nextConfig;
