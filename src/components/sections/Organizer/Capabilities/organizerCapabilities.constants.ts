import ApprovalWorkflowIcon from "@/components/icons/capabilities/ApprovalWorkflowIcon";
import AutoSyndicationIcon from "@/components/icons/capabilities/AutoSyndicationIcon";
import DuplicateDetectionIcon from "@/components/icons/capabilities/DuplicateDetectionIcon";
import GenerativeEnrichmentIcon from "@/components/icons/capabilities/GenerativeEnrichmentIcon";
import NativeDamIcon from "@/components/icons/capabilities/NativeDamIcon";
import PxInsightsIcon from "@/components/icons/capabilities/PxInsightsIcon";

export const ORGANIZER_CAPABILITIES = [
  {
    id: "generative-enrichment",
    title: "Enriquecimento generativo",
    description:
      "IA gera descrições, atributos e tags com tom de voz da sua marca, em PT-BR, EN, ES.",
    icon: GenerativeEnrichmentIcon,
  },
  {
    id: "duplicate-detection",
    title: "Detecção de duplicatas",
    description:
      "Identifica produtos repetidos por similaridade semântica, não só por SKU.",
    icon: DuplicateDetectionIcon,
  },
  {
    id: "auto-syndication",
    title: "Auto-Syndication",
    description:
      "Distribuição automática para 7+ canais com adaptação de formato por marketplace.",
    icon: AutoSyndicationIcon,
  },
  {
    id: "native-dam",
    title: "DAM nativo",
    description:
      "Gestão de imagens, vídeos e mídia com tags e versionamento por canal.",
    icon: NativeDamIcon,
  },
  {
    id: "approval-workflow",
    title: "Workflow de aprovação",
    description:
      "Reviews customizáveis por equipe (e-commerce, jurídico, marketing) antes da publicação.",
    icon: ApprovalWorkflowIcon,
  },
  {
    id: "px-insights",
    title: "PX Insights",
    description:
      "Análise de performance de produto por canal com sinais de busca, AI search e conversão.",
    icon: PxInsightsIcon,
  },
] as const;
