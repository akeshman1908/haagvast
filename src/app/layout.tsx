import OrganizationStructuredData from "@/components/seo/OrganizationStructuredData";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import MobileActionBar from "@/components/layout/MobileActionBar/MobileActionBar";
import { siteConfig } from "@/config/site";

import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://haagvast.nl"),

  title: "Huis verkopen in Haaglanden | Haagvast",

  description:
    "Uw huis verkopen in Den Haag of Haaglanden? Haagvast koopt woningen rechtstreeks. Ontvang snel en vrijblijvend een bod op uw woning.",

  keywords: [
    "huis verkopen Den Haag",
    "huis verkopen Haaglanden",
    "woning verkopen Den Haag",
    "woning direct verkopen",
    "huis verkopen zonder makelaar",
    "vastgoed opkoper Den Haag",
    "vastgoed opkoper Haaglanden",
    "Haagvast",
  ],

  alternates: {
    canonical: "https://haagvast.nl",
  },

  openGraph: {
    title: "Huis verkopen in Haaglanden | Haagvast",
    description:
      "Verkoop uw woning rechtstreeks aan Haagvast in Den Haag, Haaglanden en omgeving.",
    url: "https://haagvast.nl",
    siteName: "Haagvast",
    locale: "nl_NL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Huis verkopen in Haaglanden | Haagvast",
    description:
      "Verkoop uw woning rechtstreeks aan Haagvast in Den Haag, Haaglanden en omgeving.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16372b",
  colorScheme: "light",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.language}>
      <body>
        <div className="site-shell">
          <Header />

          <main className="site-main"><OrganizationStructuredData />
        {children}</main>

          <Footer />
        </div>

        <MobileActionBar />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
