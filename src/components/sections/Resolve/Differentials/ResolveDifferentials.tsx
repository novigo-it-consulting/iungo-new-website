import ResolveDifferentialCard from "./ResolveDifferentialCard";
import { RESOLVE_DIFFERENTIAL_CARDS } from "./resolveDifferentials.constants";

export default function ResolveDifferentials() {
  return (
    <div
      data-resolve-differentials
      className="mx-auto mt-[117px] w-full min-w-0"
    >
      <div
        data-resolve-differentials-header
        className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-4 text-center"
      >
        <span
          data-resolve-differentials-eyebrow
          className="inline-flex items-center justify-center rounded-[999px] border border-[#0024AE]/[0.18] bg-[#0024AE]/[0.07] px-[14px] py-[6px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]"
        >
          DIFERENCIAL
        </span>

        <h2
          id="resolve-differentials-title"
          data-resolve-differentials-title
          className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
        >
          Por que o Iungo Resolve vê o que Zendesk e Intercom não veem.
        </h2>

        <p
          data-resolve-differentials-subtitle
          className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
        >
          Não é mais um chatbot treinado em FAQ. É um agente plugado nos dados
          vivos da sua operação.
        </p>
      </div>

      <div
        data-resolve-differentials-grid
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 md:grid-cols-2"
      >
        {RESOLVE_DIFFERENTIAL_CARDS.map((card) => (
          <ResolveDifferentialCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
