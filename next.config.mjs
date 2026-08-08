/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // Restrict browser features to improve the user session's sandbox security
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), midi=()"
          },
          // Custom Content Security Policy allowing blob URLs for R3F / WebGL scene compilation
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; upgrade-insecure-requests; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; frame-ancestors 'none';"
          },
          // Mitigate speculatively-executed side-channel attacks (Spectre) and cross-origin leaks
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          // Prevent cross-domain policies loading content via Flash/PDF
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
