import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./css/globals.css";
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from "@/ultils/theme/custom-theme";
import Navbar from "./components/homePage/navBar";
import Footer from "./components/homePage/Footer";
import PageTransition from "./components/PageTransition";



const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OneLink Marketing",
  description: "OneLink Marketing is your end-to-end partner, providing a comprehensive roadmap to solve your marketing challenges.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white!" style={{ colorScheme: 'light' }}>
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
      </head>

      {/* Thêm !bg-white để override dark mode */}
      <body className={`${plus_jakarta_sans.className} overflow-x-hidden bg-white!`}>
        <ThemeProvider theme={customTheme}>
          <Navbar />
          <PageTransition>
            <main className="pt-20 bg-white!">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}