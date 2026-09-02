import type { ConvertHandoffCardItem } from "./convertHandoff.constants";

type ConvertHandoffCardProps = {
  item: ConvertHandoffCardItem;
};

export default function ConvertHandoffCard({ item }: ConvertHandoffCardProps) {
  return (
    <article
      data-convert-handoff-card
      data-convert-handoff-card-id={item.id}
      className="flex min-w-0 flex-col gap-2 rounded-lg bg-[#F4F4F5]/[0.60] p-5"
    >
      <h3
        data-convert-handoff-card-title
        className="m-0 w-full font-reddit text-xs font-normal leading-4 text-[#0078AA]"
      >
        {item.title}
      </h3>

      <p
        data-convert-handoff-card-description
        className="m-0 w-full font-reddit text-sm font-normal leading-5 text-[#27272A]"
      >
        {item.description}
      </p>
    </article>
  );
}
