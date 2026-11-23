import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["next-mdx-remote"],
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/Experience.html", destination: "/experience", permanent: true },
      { source: "/experience.html", destination: "/experience", permanent: true },
      { source: "/Education.html", destination: "/about", permanent: true },
      { source: "/education.html", destination: "/about", permanent: true },
      { source: "/Certifications.html", destination: "/certifications", permanent: true },
      { source: "/certifications.html", destination: "/certifications", permanent: true },
      { source: "/Skills.html", destination: "/about", permanent: true },
      { source: "/skills.html", destination: "/about", permanent: true },
      { source: "/Projects.html", destination: "/projects", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/Hobbies.html", destination: "/about", permanent: true },
      { source: "/hobbies.html", destination: "/about", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
