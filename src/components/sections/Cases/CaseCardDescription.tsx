type CaseCardDescriptionProps = {
  caseId: string;
  children: string;
};

export default function CaseCardDescription({
  caseId,
  children,
}: Readonly<CaseCardDescriptionProps>) {
  return (
    <div
      data-case-description={caseId}
      className="flex w-full flex-col gap-0 pb-3"
    >
      <p className="m-0 w-full font-reddit text-[14px] font-normal leading-[20px] tracking-[0] text-[#909090]">
        {children}
      </p>
    </div>
  );
}
