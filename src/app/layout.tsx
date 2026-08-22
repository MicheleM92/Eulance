import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoStateProvider } from "@/lib/context/DemoStateContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EULANCE | Europe's Fair Freelance Platform",
  description: "Hire trusted European freelancers with less friction, safer payments and compliant workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <DemoStateProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </DemoStateProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
