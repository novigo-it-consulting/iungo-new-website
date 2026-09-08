import { Fragment } from "react";

import PageContainer from "@/components/layout/PageContainer";

import { SCALE_PROOF_ITEMS } from "./scaleProof.constants";
import "./homeScaleProof.css";

type ScaleProofEmphasis = (typeof SCALE_PROOF_ITEMS)[number]["emphasis"];

function itemClassName(emphasis: ScaleProofEmphasis): string {
  if (emphasis === "strong") {
    return "shrink-0 whitespace-nowrap font-reddit text-2xl font-bold leading-8 text-[#27272A]/70";
  }
  if (emphasis === "strong-italic") {
    return "shrink-0 whitespace-nowrap font-reddit text-2xl font-bold italic leading-8 text-[#27272A]/70";
  }
  return "shrink-0 whitespace-nowrap font-reddit text-sm font-normal leading-5 text-[#71717A]";
}

function ScaleProofItems({ groupId }: { readonly groupId: string }) {
  return (
    <>
      {SCALE_PROOF_ITEMS.map((item) => (
        <Fragment key={`${groupId}-${item.id}`}>
          <span className={`${itemClassName(item.emphasis)} px-6`}>
            {item.label}
          </span>
          <span aria-hidden="true" className="shrink-0 px-15 text-[#71717A]">
            ·
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default function ScaleProofSection() {
  return (
    <section
      aria-labelledby="home-scale-proof-title"
      data-scale-proof-section
      className="w-full bg-white py-12"
    >
      <PageContainer size="content1264">
        <h2
          id="home-scale-proof-title"
          data-scale-proof-title
          className="mb-8 text-center font-reddit text-[30px] font-semibold leading-[72.7px] tracking-[-0.01em] text-[#424241]"
        >
          Tecnologia comprovada em operações de grande escala
        </h2>

        <div data-scale-proof-viewport className="overflow-hidden">
          <div data-scale-proof-track className="flex w-max items-center">

            {/* Grupo 1 — acessível para leitores de tela */}
            <div data-scale-proof-group className="flex shrink-0 items-center">
              <ScaleProofItems groupId="primary" />
            </div>

            {/* Grupo 2 — cópia decorativa, oculta de leitores de tela */}
            <div
              data-scale-proof-group
              aria-hidden="true"
              className="flex shrink-0 items-center"
            >
              <ScaleProofItems groupId="duplicate" />
            </div>

          </div>
        </div>
      </PageContainer>
    </section>
  );
}
