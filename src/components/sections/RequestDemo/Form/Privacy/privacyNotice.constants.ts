import { FOOTER_NAV_GROUPS } from "@/components/layout/Footer/footer.constants";

export const PRIVACY_NOTICE_DPO_EMAIL = "dpo@iungo-ai.com" as const;

const privacyNavLink = FOOTER_NAV_GROUPS.flatMap((group) => group.links).find(
  (link) => link.label === "Privacidade",
);

/** Destino pendente — link "Privacidade" no Footer está com href null. */
export const PRIVACY_POLICY_HREF = privacyNavLink?.href ?? null;
