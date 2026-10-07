import { FOOTER_NAV_GROUPS, type FooterNavLink } from "@/components/layout/Footer/footer.constants";

export { COMMERCIAL_EMAIL as PRIVACY_NOTICE_CONTACT_EMAIL } from "@/components/sections/RequestDemo/ContactCards/contactCards.constants";

function privacyLinkHref(link: FooterNavLink): string | null | undefined {
  if (link.kind === "text" && link.id === "privacy") {
    return link.href;
  }

  return undefined;
}

const privacyNavLink = FOOTER_NAV_GROUPS.flatMap((group) => group.links)
  .map(privacyLinkHref)
  .find((href) => href !== undefined);

/** Destino pendente — link "Privacidade" no Footer está com href null. */
export const PRIVACY_POLICY_HREF = privacyNavLink ?? null;
