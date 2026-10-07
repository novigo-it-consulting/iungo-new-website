import ptShared from "@/messages/pt-BR/productPages.json";
import ptAttendant from "@/messages/pt-BR/productPages/attendant.json";
import ptBehavior from "@/messages/pt-BR/productPages/behavior.json";
import ptConcierge from "@/messages/pt-BR/productPages/concierge.json";
import ptConvert from "@/messages/pt-BR/productPages/convert.json";
import ptIotAreas from "@/messages/pt-BR/productPages/iotAreas.json";
import ptIotBody from "@/messages/pt-BR/productPages/iotBody.json";
import ptIotHero from "@/messages/pt-BR/productPages/iotHero.json";
import ptIotTech from "@/messages/pt-BR/productPages/iotTech.json";
import ptOrganizer from "@/messages/pt-BR/productPages/organizer.json";
import ptResolve from "@/messages/pt-BR/productPages/resolve.json";

import enShared from "@/messages/en/productPages.json";
import enAttendant from "@/messages/en/productPages/attendant.json";
import enBehavior from "@/messages/en/productPages/behavior.json";
import enConcierge from "@/messages/en/productPages/concierge.json";
import enConvert from "@/messages/en/productPages/convert.json";
import enIotAreas from "@/messages/en/productPages/iotAreas.json";
import enIotBody from "@/messages/en/productPages/iotBody.json";
import enIotHero from "@/messages/en/productPages/iotHero.json";
import enIotTech from "@/messages/en/productPages/iotTech.json";
import enOrganizer from "@/messages/en/productPages/organizer.json";
import enResolve from "@/messages/en/productPages/resolve.json";

import esShared from "@/messages/es/productPages.json";
import esAttendant from "@/messages/es/productPages/attendant.json";
import esBehavior from "@/messages/es/productPages/behavior.json";
import esConcierge from "@/messages/es/productPages/concierge.json";
import esConvert from "@/messages/es/productPages/convert.json";
import esIotAreas from "@/messages/es/productPages/iotAreas.json";
import esIotBody from "@/messages/es/productPages/iotBody.json";
import esIotHero from "@/messages/es/productPages/iotHero.json";
import esIotTech from "@/messages/es/productPages/iotTech.json";
import esOrganizer from "@/messages/es/productPages/organizer.json";
import esResolve from "@/messages/es/productPages/resolve.json";

const ptIot = {
  ...ptIotHero,
  ...ptIotAreas,
  ...ptIotTech,
  ...ptIotBody,
};

const pt = {
  shared: ptShared.shared,
  organizer: ptOrganizer,
  behavior: ptBehavior,
  concierge: ptConcierge,
  resolve: ptResolve,
  attendant: ptAttendant,
  convert: ptConvert,
  iot: ptIot,
};

export const productPagesCatalog = {
  "pt-BR": pt,
  en: {
    shared: enShared.shared,
    organizer: enOrganizer,
    behavior: enBehavior,
    concierge: enConcierge,
    resolve: enResolve,
    attendant: enAttendant,
    convert: enConvert,
    iot: {
      ...enIotHero,
      ...enIotAreas,
      ...enIotTech,
      ...enIotBody,
    },
  } satisfies typeof pt,
  es: {
    shared: esShared.shared,
    organizer: esOrganizer,
    behavior: esBehavior,
    concierge: esConcierge,
    resolve: esResolve,
    attendant: esAttendant,
    convert: esConvert,
    iot: {
      ...esIotHero,
      ...esIotAreas,
      ...esIotTech,
      ...esIotBody,
    },
  } satisfies typeof pt,
};
