type CaseCardMediaProps = {
  caseId: string;
  accessibleName: string;
};

export default function CaseCardMedia({
  caseId,
  accessibleName,
}: CaseCardMediaProps) {
  return (
    <div
      data-case-media={caseId}
      role="img"
      aria-label={accessibleName}
      className="aspect-video w-full shrink-0 overflow-hidden bg-[#F1F3FA]"
    >
      {/* A imagem real será adicionada futuramente */}
    </div>
  );
}
