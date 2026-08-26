import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section
      data-hero-section
      aria-labelledby="hero-title"
      className="relative w-full overflow-x-clip bg-linear-to-b from-[#FFFFFF] from-0% to-[#DCEBFF] to-100% xl:min-h-[737px]"
    >
      <div className="mx-auto w-full max-w-[1728px] px-4 md:px-8">
        <div className="relative xl:min-h-[737px]">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
