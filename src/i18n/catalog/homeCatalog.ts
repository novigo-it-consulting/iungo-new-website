import ptCommon from "@/messages/pt-BR/common.json";
import ptHome from "@/messages/pt-BR/home.json";
import ptProductPages from "@/messages/pt-BR/productPages.json";

import enCommon from "@/messages/en/common.json";
import enHome from "@/messages/en/home.json";
import enProductPages from "@/messages/en/productPages.json";

import esCommon from "@/messages/es/common.json";
import esHome from "@/messages/es/home.json";
import esProductPages from "@/messages/es/productPages.json";

const ptBR = {
  common: ptCommon,
  home: ptHome,
  productPages: ptProductPages,
};

export const homeCatalog = {
  "pt-BR": ptBR,
  en: {
    common: enCommon,
    home: enHome,
    productPages: enProductPages,
  } satisfies typeof ptBR,
  es: {
    common: esCommon,
    home: esHome,
    productPages: esProductPages,
  } satisfies typeof ptBR,
};
