import { FOOTER_NAV_GROUPS } from "@/components/layout/Footer/footer.constants";

export { COMMERCIAL_EMAIL as PRIVACY_NOTICE_CONTACT_EMAIL } from "@/components/sections/RequestDemo/ContactCards/contactCards.constants";

const privacyNavLink = FOOTER_NAV_GROUPS.flatMap((group) => group.links).find(
  (link) => link.label === "Privacidade",
);

/** Destino pendente — link "Privacidade" no Footer está com href null. */
export const PRIVACY_POLICY_HREF = privacyNavLink?.href ?? null;
