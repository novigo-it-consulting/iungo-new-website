import ptCommon from "@/messages/pt-BR/common.json";
import ptHome from "@/messages/pt-BR/home.json";

import enCommon from "@/messages/en/common.json";
import enHome from "@/messages/en/home.json";

import esCommon from "@/messages/es/common.json";
import esHome from "@/messages/es/home.json";

const ptBR = {
  common: ptCommon,
  home: ptHome,
};

export const homeCatalog = {
  "pt-BR": ptBR,
  en: {
    common: enCommon,
    home: enHome,
  } satisfies typeof ptBR,
  es: {
    common: esCommon,
    home: esHome,
  } satisfies typeof ptBR,
};
