import PageContainer from "@/components/layout/PageContainer";

import BehaviorSystemScreensBadges from "./BehaviorSystemScreensBadges";
import BehaviorSystemScreensVisuals from "./BehaviorSystemScreensVisuals";

export default function BehaviorSystemScreensSection() {
  return (
    <section
      data-behavior-system-screens-section
      aria-labelledby="behavior-system-screens-title"
      className="w-full min-w-0 bg-white py-16 xl:py-[96px]"
    >
      <PageContainer
        data-behavior-system-screens-container
        size="content1280"
        className="min-w-0"
      >
        <div
          data-behavior-system-screens-header
          className="mx-auto flex w-full max-w-[672px] flex-col gap-3 text-center"
        >
          <div
            data-behavior-system-screens-title-frame
            className="w-full pt-1"
          >
            <h2
              id="behavior-system-screens-title"
              data-behavior-system-screens-title
              className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
            >
              A interface real, todo dia, em produção.
            </h2>
          </div>

          <p
            data-behavior-system-screens-description
            className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
          >
            Ficha de produto, workflow editorial, governança de atributos e
            publicação multi-canal.
          </p>
        </div>

        <BehaviorSystemScreensBadges />

        <BehaviorSystemScreensVisuals />
      </PageContainer>
    </section>
  );
}
