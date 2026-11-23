import type { NextConfig } from "next";

const CSP_TRIAL = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-src 'self' blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // Render <title>, description, canonical and hreflang in <head> for every request, not streamed
  // into the body: an empty user agent counts as a browser, and some crawlers and link previews
  // read only the head. ".*" matches every user agent, including an empty one.
  htmlLimitedBots: /.*/,
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
      // Trial policy, reported only (browsers log violations, nothing is blocked).
      // Inline scripts stay allowed: the React payload is inlined in each page and
      // pages are edge-cached, so per-request nonces are not possible. The gain is
      // the host allowlist: only this site and Cloudflare Web Analytics may load code.
      { key: "Content-Security-Policy-Report-Only", value: CSP_TRIAL },
    ];
    return [
      { source: "/:path*", headers: baseline },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
};

export default nextConfig;
