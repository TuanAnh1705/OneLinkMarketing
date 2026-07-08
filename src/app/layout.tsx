import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./css/globals.css";
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from "@/ultils/theme/custom-theme";
import Navbar from "./components/homePage/navBar";
import Footer from "./components/homePage/Footer";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import { homepageController, globalController } from "@vns-core/core";
import { DEFAULT_METADATA, buildMetadata } from "@vns-core/core/seo/metadata";
import type { NavbarData } from "@vns-core/core/types/navbar";
import type { FooterData } from "@vns-core/core/types/footer";
import JsonLdScript from "@/components/seo/JsonLdScript";



const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

// Default site SEO comes from the homepage `DefaultSEO` component in Strapi, falling
// back to the built-in defaults when the field is empty/unreachable (build-safe).
export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await homepageController.getPageData();
    // Cast bridges the two structurally-identical `Metadata` types (app's next vs the
    // copy resolved through @olma/core) — same next 15 shape, different module identity.
    return buildMetadata(res.data?.DefaultSEO ?? null, "/") as Metadata;
  } catch {
    return DEFAULT_METADATA as Metadata;
  }
}

// Site-wide structured data (JSON-LD) from the homepage `seoSchemaJsonld` field.
async function getSiteSchema(): Promise<Record<string, unknown> | null> {
  try {
    const res = await homepageController.getPageData();
    return (res.data?.seoSchemaJsonld as Record<string, unknown> | undefined) ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSchema = await getSiteSchema();

  // Navbar + footer content from Strapi (via @vns-core/core). Both components fall
  // back to their built-in defaults when data is null, so the shell always renders.
  let navbarData: NavbarData | null = null;
  let footerData: FooterData | null = null;
  try {
    const global = await globalController.getGlobal();
    navbarData = global.navbar?.data ?? null;
    footerData = global.footer?.data ?? null;
  } catch (error) {
    console.error("Error fetching global (navbar/footer) data:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning className="bg-white!" style={{ colorScheme: 'light' }}>
      <head>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link
          rel="shortcut icon"
          href="/assets/favicon-new.png"
          type="image/png"
          sizes="32x20"
        />
        <ThemeModeScript />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLdScript data={siteSchema} />
      </head>

      {/* Thêm !bg-white để override dark mode */}
      <body className={`${plus_jakarta_sans.className} overflow-x-hidden bg-white!`}>
        <ThemeProvider theme={customTheme}>
          <SmoothScroll>
            <Navbar data={navbarData} />
            <PageTransition>
              <main className="pt-20 bg-white!">
                {children}
              </main>
            </PageTransition>
            <Footer data={footerData} />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}