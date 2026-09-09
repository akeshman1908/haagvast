import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.url}/werkwijze`,
  },
};

type RouteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RouteLayout({
  children,
}: RouteLayoutProps) {
  return children;
}
