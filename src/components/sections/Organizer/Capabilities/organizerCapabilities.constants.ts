import ApprovalWorkflowIcon from "@/components/icons/capabilities/ApprovalWorkflowIcon";
import AutoSyndicationIcon from "@/components/icons/capabilities/AutoSyndicationIcon";
import DuplicateDetectionIcon from "@/components/icons/capabilities/DuplicateDetectionIcon";
import GenerativeEnrichmentIcon from "@/components/icons/capabilities/GenerativeEnrichmentIcon";
import NativeDamIcon from "@/components/icons/capabilities/NativeDamIcon";
import PxInsightsIcon from "@/components/icons/capabilities/PxInsightsIcon";

export const ORGANIZER_CAPABILITIES = [
  { id: "generative-enrichment", icon: GenerativeEnrichmentIcon },
  { id: "duplicate-detection", icon: DuplicateDetectionIcon },
  { id: "auto-syndication", icon: AutoSyndicationIcon },
  { id: "native-dam", icon: NativeDamIcon },
  { id: "approval-workflow", icon: ApprovalWorkflowIcon },
  { id: "px-insights", icon: PxInsightsIcon },
] as const;
