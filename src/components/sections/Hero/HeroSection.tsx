import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import PageSideRails from "@/components/layout/PageSideRails";

export default function HeroSection() {
  return (
    <section
      data-hero-section
      data-page-rail-section="hero"
      data-gradient-section
      aria-labelledby="hero-title"
      className="relative box-border w-full overflow-x-clip bg-linear-to-b from-[#FFFFFF] from-0% to-[#DCEBFF] to-100% xl:min-h-[737px] 2xl:h-[558px] 2xl:min-h-[558px]"
    >
      <PageSideRails
        scope="hero"
        className="mx-auto max-w-[1728px] px-4 md:px-8 2xl:max-w-none 2xl:px-0"
      >
        <div className="relative xl:min-h-[737px] 2xl:h-[558px] 2xl:min-h-0">
          <HeroContent />
          <HeroVisual />
        </div>
      </PageSideRails>
    </section>
  );
}
