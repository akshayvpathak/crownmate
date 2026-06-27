import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/providers/app-providers";
import { SiteLayout } from "@/components/layout/site-layout";
import {
  generatePageMetadata,
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/seo";
import "@/styles/globals.css";

const interTight = localFont({
  src: [
    {
      path: "../fonts/InterTight-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InterTight-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/InterTight-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/InterTight-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-tight",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const franie = localFont({
  src: "../fonts/FranieVariableTest-Regular.otf",
  variable: "--font-franie",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = generatePageMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateOrganizationJsonLd();
  const localBizJsonLd = generateLocalBusinessJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizJsonLd) }}
        />
      </head>
      <body className={`${interTight.variable} ${franie.variable} antialiased`}>
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
