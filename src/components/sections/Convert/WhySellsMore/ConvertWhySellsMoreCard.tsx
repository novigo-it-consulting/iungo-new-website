import type { ConvertWhySellsMoreCardItem } from "./whySellsMore.constants";

type ConvertWhySellsMoreCardProps = {
  card: ConvertWhySellsMoreCardItem;
};

export default function ConvertWhySellsMoreCard({
  card,
}: Readonly<ConvertWhySellsMoreCardProps>) {
  return (
    <article
      data-convert-why-sells-more-card
      data-convert-why-sells-more-card-id={card.id}
      className="box-border flex min-w-0 flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-[#F4F4F5]/60 p-8"
    >
      <p
        data-convert-why-sells-more-card-category
        className="m-0 p-0 font-reddit text-base font-semibold leading-6 text-[#0078AA]"
      >
        {card.category}
      </p>

      <h3
        data-convert-why-sells-more-card-title
        className="m-0 font-reddit text-lg font-bold leading-7 tracking-[-0.36px] text-[#27272A]"
      >
        {card.title}
      </h3>

      <p
        data-convert-why-sells-more-card-description
        className="m-0 font-reddit text-sm font-normal leading-5 tracking-normal text-[#71717A]"
      >
        {card.description}
      </p>
    </article>
  );
}
