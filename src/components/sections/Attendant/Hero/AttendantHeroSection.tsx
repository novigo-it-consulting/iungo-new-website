import AttendantHeroContent from "./AttendantHeroContent";
import AttendantHeroVisual from "./AttendantHeroVisual";

export default function AttendantHeroSection() {
  return (
    <section
      data-attendant-hero-section
      aria-labelledby="attendant-hero-title"
      className="w-full min-w-0 bg-white bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(59,55,192,0.10)_100%)] py-12 md:py-14 xl:min-h-[618px] xl:py-[54px]"
    >
      <div
        data-attendant-hero-container
        className="mx-auto grid min-w-0 w-[calc(100%_-_48px)] grid-cols-1 sm:w-[calc(100%_-_64px)] xl:w-full xl:grid-cols-[minmax(0,1fr)_450px] xl:items-start xl:pl-[330px] xl:pr-[320px]"
      >
        <AttendantHeroContent />

        <AttendantHeroVisual />
      </div>
    </section>
  );
}
