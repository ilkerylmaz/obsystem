/** @type {import('next').NextConfig} */
const nextConfig = {
    // Docker multi-stage build için — sadece gerekli dosyaları kopyalar
    output: "standalone",
};

export default nextConfig;
