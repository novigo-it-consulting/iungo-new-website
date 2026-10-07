interface OrganizerStepItemProps {
  number: string;
  title: string;
  description: string;
}

export default function OrganizerStepItem({
  number,
  title,
  description,
}: Readonly<OrganizerStepItemProps>) {
  return (
    <li className="flex w-full min-w-0 flex-col items-start gap-2">
      <span className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-normal text-[#1E9F67]">
        {number}
      </span>

      <h3 className="m-0 w-full font-reddit text-[20px] font-bold leading-7 tracking-[-0.4px] text-[#27272A]">
        {title}
      </h3>

      <p className="m-0 w-full pt-1 font-reddit text-[14px] font-normal leading-5 tracking-normal text-[#71717A]">
        {description}
      </p>
    </li>
  );
}
