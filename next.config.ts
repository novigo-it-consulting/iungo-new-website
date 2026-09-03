import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impede clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Desativa sniffing de MIME type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limita informação de origem no Referer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Desativa funcionalidades sensíveis do browser desnecessárias para marketing
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
