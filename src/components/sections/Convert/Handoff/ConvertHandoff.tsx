import ConvertHandoffCard from "./ConvertHandoffCard";
import { CONVERT_HANDOFF_CARDS } from "./convertHandoff.constants";

export default function ConvertHandoff() {
  return (
    <div
      data-convert-handoff-container
      aria-labelledby="convert-handoff-title"
      className="box-border flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-12"
    >
      <span
        data-convert-handoff-badge
        className="m-0 inline-flex w-fit shrink-0 items-center justify-center self-start rounded-[999px] border border-[#96989A]/[0.30] bg-[#96989A]/[0.12] px-[14.4px] py-[6.4px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#4D7C0F]"
      >
        HANDOFF HUMANO
      </span>

      <h2
        id="convert-handoff-title"
        data-convert-handoff-title
        className="m-0 w-full min-w-0 font-reddit text-2xl font-bold leading-8 tracking-[-0.48px] text-[#27272A]"
      >
        Quando entrega ao vendedor humano, entrega tudo.
      </h2>

      <p
        data-convert-handoff-description
        className="m-0 w-full min-w-0 font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
      >
        95% dos chatbots passam o cliente &quot;do zero&quot; para o humano. O
        Iungo Convert passa o briefing pronto:
      </p>

      <div
        data-convert-handoff-cards
        className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
      >
        {CONVERT_HANDOFF_CARDS.map((item) => (
          <ConvertHandoffCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
