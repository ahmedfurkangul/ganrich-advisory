import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./practice.css";

export const metadata: Metadata = {
  title: "Ganrich Advisory",
  description:
    "Founder-led strategy advice for owners and leadership teams of established Turkish companies.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get("x-ganrich-language") === "tr" ? "tr" : "en";
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
