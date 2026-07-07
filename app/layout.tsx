import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zunaid Hasan — AI Engineer & Full Stack Developer",
  description:
    "Building production AI systems that matter. Voice AI, LLM pipelines, and SaaS solutions for Bangladesh. Creator of DeshVox.",
  keywords: ["AI Engineer", "Full Stack Developer", "Bangladesh", "Voice AI", "DeshVox", "Dhaka"],
  openGraph: {
    title: "Zunaid Hasan — AI Engineer & Full Stack Developer",
    description: "Building production AI systems that matter.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-bg text-text antialiased">
        {children}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
