type ProductSectionEyebrowProps = {
  label: string;
  dataAttribute?: string;
};

export default function ProductSectionEyebrow({
  label,
  dataAttribute,
}: ProductSectionEyebrowProps) {
  return (
    <span
      {...(dataAttribute ? { [dataAttribute]: true } : {})}
      className="inline-flex items-center justify-center rounded-[999px] border border-[#0024AE]/[0.18] bg-[#0024AE]/[0.07] px-[14px] py-[6px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]"
    >
      {label}
    </span>
  );
}
