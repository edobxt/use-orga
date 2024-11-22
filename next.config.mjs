/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            // Ajoutez d'autres domaines spécifiques si nécessaire
        ],
    },
};

export default nextConfig;
