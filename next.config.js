/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['qph.cf2.quoracdn.net','lh3.googleusercontent.com','demoda.vn','e.khoahoc.tv'],
         unoptimized: true,
    }
}

module.exports = nextConfig
