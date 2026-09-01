import { ATTENDANT_COMPLIANCE_METRICS } from "./attendantCompliance.constants";

function AttendantComplianceBadge() {
  return (
    <span
      data-attendant-compliance-badge
      className="inline-flex w-fit shrink-0 items-center justify-center rounded-[999px] border border-[#E4E4E7] bg-[#F4F4F5] px-[14px] py-[6px]"
    >
      <span className="font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#15803D]">
        COMPLIANCE
      </span>
    </span>
  );
}

export default function AttendantCompliance() {
  return (
    <div
      data-attendant-compliance-container
      className="box-border flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-12"
    >
      <AttendantComplianceBadge />

      <h2
        id="attendant-compliance-title"
        data-attendant-compliance-title
        className="m-0 w-full min-w-0 font-reddit text-2xl font-bold leading-8 tracking-[-0.48px] text-[#27272A]"
      >
        Auditoria & rastreabilidade total
      </h2>

      <p
        data-attendant-compliance-description
        className="m-0 w-full min-w-0 font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
      >
        Cada operação executada gera um log assinado: identificação do cliente
        (com mascaramento LGPD), payload da chamada, resposta da API, hash do
        consentimento. Pronto para auditoria interna, ANPD ou Procon.
      </p>

      <ul
        data-attendant-compliance-metrics
        className="grid w-full min-w-0 grid-cols-1 gap-4 pt-2 md:grid-cols-3"
      >
        {ATTENDANT_COMPLIANCE_METRICS.map((metric) => (
          <li key={metric.id} className="min-w-0">
            <div
              data-attendant-compliance-metric={metric.id}
              className="flex min-w-0 flex-col items-center gap-1 rounded-lg bg-[#F7F7F8] p-4 text-center"
            >
              <p
                data-attendant-compliance-metric-value={metric.id}
                className="m-0 w-full font-reddit text-2xl font-bold leading-8 tracking-[-0.48px] text-[#3B37C0]"
              >
                {metric.value}
              </p>
              <p
                data-attendant-compliance-metric-label={metric.id}
                className="m-0 w-full font-reddit text-xs font-normal leading-4 tracking-normal text-[#71717A]"
              >
                {metric.label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
