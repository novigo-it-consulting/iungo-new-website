type CaseCardTitleProps = {
  caseId: string;
  children: string;
};

export default function CaseCardTitle({ caseId, children }: Readonly<CaseCardTitleProps>) {
  return (
    <h3
      data-case-title={caseId}
      className="m-0 w-full font-reddit text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-[#041527]"
    >
      {children}
    </h3>
  );
}
