import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const baseline = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      // HTTPS only for a year. Subdomains are left out on purpose: the studio
      // and mail records live there and are managed separately.
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      // Only this site may frame its pages; the PDF reader embeds our own
      // document route, so 'self' rather than 'none'.
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'" },
    ];
    return [
      { source: "/:path*", headers: baseline },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
