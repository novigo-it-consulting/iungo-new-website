import type { Metadata } from "next";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Iungo Intelligence",
  description: "A única plataforma do Brasil que integra PIM, CDP, Concierge, AI Agents e IoT sobre uma infraestrutura proprietária de IA pronta para varejo digital de alta complexidade.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${redditSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
