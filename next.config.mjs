/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Avoid server-side fetch/optimization for external image hosts.
        // This prevents ENOTFOUND crashes when GitHub raw host is unreachable.
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
