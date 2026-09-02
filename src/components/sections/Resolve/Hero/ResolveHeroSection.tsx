import ResolveHeroContent from "./ResolveHeroContent";
import ResolveHeroVisual from "./ResolveHeroVisual";

export default function ResolveHeroSection() {
  return (
    <section
      data-resolve-hero-section
      aria-labelledby="resolve-hero-title"
      className="w-full min-w-0 bg-white bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(200,79,4,0.10)_100%)] py-12 md:py-14 xl:min-h-[628px] xl:pb-[49px] xl:pt-[54px]"
    >
      <div
        data-resolve-hero-container
        className="mx-auto grid min-w-0 w-[calc(100%_-_48px)] grid-cols-1 sm:w-[calc(100%_-_64px)] xl:w-full xl:grid-cols-[minmax(0,1fr)_450px] xl:items-start xl:pl-[330px] xl:pr-[320px]"
      >
        <ResolveHeroContent />

        <ResolveHeroVisual />
      </div>
    </section>
  );
}
