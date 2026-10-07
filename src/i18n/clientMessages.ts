import type { AppMessages } from "./loadMessages";
import {
  CLIENT_MESSAGE_NAMESPACES,
  type ClientMessageNamespace,
} from "./namespaces";

export type ClientMessages = Pick<AppMessages, ClientMessageNamespace>;

export function pickClientMessages(messages: AppMessages): ClientMessages {
  const picked: ClientMessages = {
    header: messages.header,
    megaMenu: messages.megaMenu,
    mobileNav: messages.mobileNav,
    footerNewsletter: messages.footerNewsletter,
    cookies: messages.cookies,
    languageSelector: messages.languageSelector,
    products: messages.products,
    common: messages.common,
  };

  const pickedKeys = Object.keys(picked);
  const declared = CLIENT_MESSAGE_NAMESPACES.length;

  if (
    pickedKeys.length !== declared ||
    CLIENT_MESSAGE_NAMESPACES.some((namespace) => !pickedKeys.includes(namespace))
  ) {
    throw new Error("Namespaces de cliente fora de sincronia com o catálogo.");
  }

  return picked;
}
