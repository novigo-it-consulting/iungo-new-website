type DarkSectionEyebrowProps = {
  label: string;
  dataAttribute?: string;
};

export default function DarkSectionEyebrow({
  label,
  dataAttribute,
}: Readonly<DarkSectionEyebrowProps>) {
  return (
    <span
      {...(dataAttribute ? { [dataAttribute]: true } : {})}
      className="box-border inline-flex w-fit shrink-0 self-start items-center justify-center whitespace-nowrap rounded-[999px] border border-white/[0.12] bg-white/[0.07] px-[14.4px] py-[6.4px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.672px] text-white/[0.92] backdrop-blur-[4px]"
    >
      {label}
    </span>
  );
}
