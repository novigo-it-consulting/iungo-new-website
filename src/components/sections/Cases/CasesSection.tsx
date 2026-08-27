import CaseCard from "./CaseCard";
import CaseCardContent from "./CaseCardContent";
import CaseCardDescription from "./CaseCardDescription";
import CaseCardMedia from "./CaseCardMedia";
import CaseCardMetrics from "./CaseCardMetrics";
import CaseCardTitle from "./CaseCardTitle";
import CaseTag from "./CaseTag";
import { CASES } from "./cases.constants";

export default function CasesSection() {
  return (
    <section
      id="casos-de-sucesso"
      aria-labelledby="cases-title"
      className="m-0 w-full bg-white"
    >
      <div
        data-section="cases-container"
        className="mx-auto flex w-full max-w-[1280px] flex-col items-stretch gap-8 overflow-visible px-5 py-12 sm:px-6 sm:py-16 lg:gap-12 lg:px-8 lg:py-24"
      >
        <div
          data-cases="header"
          className="flex w-full flex-col items-start gap-6 lg:min-h-[95.8px] lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <div
            data-cases="heading-group"
            className="flex min-w-0 flex-col items-start gap-4"
          >
            {/* Selo */}
            <span
              data-cases="badge"
              className="box-border inline-flex h-[31.8px] w-[145.8px] shrink-0 items-center justify-center overflow-visible rounded-[399px] border border-[#0024AE]/25 bg-[#0024AE]/5 px-[14.4px] py-[6.4px] backdrop-blur-sm"
            >
              <span
                data-cases="badge-text"
                className="flex h-[17px] w-[115px] items-center justify-center whitespace-nowrap text-center font-reddit text-[11.2px] font-medium leading-[16.8px] text-[#0024AE]"
              >
                CASOS DE SUCESSO
              </span>
            </span>

            {/* Título */}
            <h2
              id="cases-title"
              data-cases="title"
              className="m-0 w-fit max-w-full font-reddit text-[30px] font-semibold leading-[48px] tracking-[-0.96px] text-[#041527]"
            >
              Resultados em produção. Não em pitch deck.
            </h2>
          </div>

          {/* Botão */}
          <button
            type="button"
            data-cases="all-cases-button"
            className="box-border inline-flex h-[41px] w-[157px] shrink-0 items-center justify-center gap-[8.67px] self-start whitespace-nowrap rounded-[43.36px] border-0 bg-[#0024AE] px-[13.88px] py-[6.94px] shadow-none hover:bg-[#0024AE] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 lg:self-auto"
          >
            <span
              data-cases="all-cases-button-text"
              className="w-fit whitespace-nowrap font-reddit text-[13.63px] font-bold leading-[20.8px] tracking-[0] text-white"
            >
              Ver todos os casos
            </span>
          </button>
        </div>

        <div
          data-cases="cards-grid"
          className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0"
        >
          <CaseCard
            caseId="lider-moda-premium"
            accessibleName="Caso de sucesso Líder Moda Premium"
            media={
              <CaseCardMedia
                caseId="lider-moda-premium"
                accessibleName="Espaço reservado para a imagem do caso Líder Moda Premium"
              />
            }
          >
            <CaseCardContent>
              <div
                data-case-tags="lider-moda-premium"
                className="flex w-full flex-wrap items-center justify-start gap-2 overflow-visible p-0"
              >
                <CaseTag tone="blue">MODA</CaseTag>
                <CaseTag tone="red">CONCIERGE</CaseTag>
                <CaseTag tone="blue">CDP</CaseTag>
              </div>
              <CaseCardTitle caseId="lider-moda-premium">
                +R$ 600 mil em 15 dias, em 6 marcas simultâneas
              </CaseCardTitle>
              <CaseCardDescription caseId="lider-moda-premium">
                A maior holding de moda premium da AL ativou Concierge em 6 marcas e dobrou a CVR vs média do site, projetando R$ 14M de receita incremental anual.
              </CaseCardDescription>
              <div
                data-case-divider="lider-moda-premium"
                className="h-px w-full bg-[#E4E4E7]"
                role="separator"
                aria-hidden="true"
              />
              <CaseCardMetrics
                caseId="lider-moda-premium"
                metrics={CASES["lider-moda-premium"].metrics}
                valueClassName={CASES["lider-moda-premium"].metricsValueClassName}
              />
            </CaseCardContent>
          </CaseCard>
          <CaseCard
            caseId="raia-drogasil"
            accessibleName="Caso de sucesso Raia Drogasil"
            media={
              <CaseCardMedia
                caseId="raia-drogasil"
                accessibleName="Espaço reservado para a imagem do caso Raia Drogasil"
              />
            }
          >
            <CaseCardContent>
              <div
                data-case-tags="raia-drogasil"
                className="flex w-full flex-wrap items-center justify-start gap-2 overflow-visible p-0"
              >
                <CaseTag tone="blue">FARMA &amp; SAÚDE</CaseTag>
                <CaseTag tone="yellow">IOT</CaseTag>
                <CaseTag tone="blue">RFID</CaseTag>
              </div>
              <CaseCardTitle caseId="raia-drogasil">
                70.000+ ativos rastreados, do notebook ao terminal de loja
              </CaseCardTitle>
              <CaseCardDescription caseId="raia-drogasil">
                A maior rede de farmácias do Brasil estruturou gestão de patrimônio com Iungo IoT (RFID + RTLS), eliminando perdas e otimizando operações em 3.000 lojas.
              </CaseCardDescription>
              <div
                data-case-divider="raia-drogasil"
                className="h-px w-full bg-[#E4E4E7]"
                role="separator"
                aria-hidden="true"
              />
              <CaseCardMetrics
                caseId="raia-drogasil"
                metrics={CASES["raia-drogasil"].metrics}
                valueClassName={CASES["raia-drogasil"].metricsValueClassName}
              />
            </CaseCardContent>
          </CaseCard>
        </div>
      </div>
    </section>
  );
}
