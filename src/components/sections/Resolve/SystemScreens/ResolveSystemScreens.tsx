import ResolveSystemScreensBadges from "./ResolveSystemScreensBadges";
import ResolveSystemScreensVisuals from "./ResolveSystemScreensVisuals";

export default function ResolveSystemScreens() {
  return (
    <>
      <div
        data-resolve-system-screens-header
        className="mx-auto flex w-full max-w-[672px] flex-col gap-3 text-center"
      >
        <div
          data-resolve-system-screens-title-frame
          className="w-full pt-1"
        >
          <h2
            id="resolve-system-screens-title"
            data-resolve-system-screens-title
            className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
          >
            O console que o supervisor de CX olha o dia inteiro.
          </h2>
        </div>

        <p
          data-resolve-system-screens-description
          className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
        >
          Console de operação, treinamento via PIM, métricas de qualidade e
          supervisão de handoff.
        </p>
      </div>

      <ResolveSystemScreensBadges />

      <ResolveSystemScreensVisuals />
    </>
  );
}
