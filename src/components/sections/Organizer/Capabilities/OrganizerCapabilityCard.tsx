import type { SVGProps } from "react";

type CapabilityIcon = React.ComponentType<SVGProps<SVGSVGElement>>;

interface OrganizerCapabilityCardProps {
  title: string;
  description: string;
  icon: CapabilityIcon;
}

export default function OrganizerCapabilityCard({
  title,
  description,
  icon: Icon,
}: Readonly<OrganizerCapabilityCardProps>) {
  return (
    <li className="flex h-full w-full min-w-0 flex-col items-start rounded-lg border border-[#E4E4E7] bg-white p-6 2xl:min-h-[178px]">
      <div className="flex w-full min-w-0 flex-col items-start">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(30,159,103,0.12)]">
          <Icon
            aria-hidden="true"
            focusable="false"
            className="size-5 text-[#1E9F67]"
          />
        </div>

        <h3 className="m-0 mt-4 w-full font-reddit text-[16px] font-semibold leading-6 tracking-[-0.32px] text-[#27272A]">
          {title}
        </h3>

        <p className="m-0 mt-2 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#71717A]">
          {description}
        </p>
      </div>
    </li>
  );
}
