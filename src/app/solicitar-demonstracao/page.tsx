import type { Metadata } from "next";

import RequestDemoSection from "@/components/sections/RequestDemo/Main/RequestDemoSection";

export const metadata: Metadata = {
  title: "Vamos conversar | Iungo Intelligence",
  description:
    "Solicite uma demonstração ou agende um diagnóstico com a Iungo Intelligence.",
};

export default function SolicitarDemonstracaoPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <RequestDemoSection />
    </main>
  );
}
