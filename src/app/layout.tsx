import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

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
      className={`${redditSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
