import PrimaryLink from "@/components/ui/PrimaryLink";

import { IOT_HERO_COPY } from "./iotHero.constants";
import IoTHeroIcon from "./IoTHeroIcon";

const heroParagraphClassName =
  "m-0 w-full font-reddit text-base font-normal leading-8 tracking-[0.38px] text-[#041527]";

export default function IoTHeroContent() {
  return (
    <div
      data-iot-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <IoTHeroIcon />
      </div>

      <div
        data-iot-hero-title-frame
        className="w-full max-w-[544px] xl:min-h-[113px]"
      >
        <h1
          id="iot-hero-title"
          data-iot-hero-title
          className="m-0 w-full font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.01em]"
        >
          {IOT_HERO_COPY.title}
        </h1>
      </div>

      <div
        data-iot-hero-description-block
        className="mt-[14px] w-full max-w-[615px]"
      >
        <p data-iot-hero-presentation className={heroParagraphClassName}>
          {IOT_HERO_COPY.paragraphs[0]}
        </p>

        <p
          data-iot-hero-description
          className={`mt-[14px] ${heroParagraphClassName}`}
        >
          {IOT_HERO_COPY.paragraphs[1]}
        </p>
      </div>

      <div data-iot-hero-cta className="mt-[60px] inline-flex">
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
