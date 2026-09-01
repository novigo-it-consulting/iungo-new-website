type ConciergeTriggerCardProps = {
  value: string;
  title: string;
  description: string;
};

export default function ConciergeTriggerCard({
  value,
  title,
  description,
}: ConciergeTriggerCardProps) {
  return (
    <li
      data-concierge-trigger-card
      className="flex min-h-[134px] w-full flex-col gap-1 rounded-lg border border-[#E4E4E7] bg-white p-6"
    >
      <p
        data-concierge-trigger-value
        className="w-full font-reddit text-[30px] font-bold leading-[36px] tracking-[-0.6px] text-[#A72121]"
      >
        {value}
      </p>

      <p
        data-concierge-trigger-title
        className="w-full font-reddit text-[14px] font-medium leading-[20px] tracking-normal text-[#27272A]"
      >
        {title}
      </p>

      <p
        data-concierge-trigger-description
        className="w-full font-reddit text-[12px] font-normal leading-[16px] tracking-normal text-[#71717A]"
      >
        {description}
      </p>
    </li>
  );
}
