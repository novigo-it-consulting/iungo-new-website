import { describe, expect, it } from "vitest";

import {
  getHeaderLanguage,
  getOtherHeaderLanguages,
} from "./languageSelector.constants";

describe("getHeaderLanguage", () => {
  it("encontra um código cadastrado", () => {
    expect(getHeaderLanguage("en")).toEqual({
      code: "en",
      label: "EN",
      name: "English",
      flagSrc: "/images/flags/en.svg",
    });
  });
});

describe("getOtherHeaderLanguages", () => {
  it("exclui o idioma atual e mantém a ordem cadastrada", () => {
    expect(getOtherHeaderLanguages("pt-BR").map((item) => item.code)).toEqual([
      "en",
      "es",
    ]);
    expect(getOtherHeaderLanguages("en").map((item) => item.code)).toEqual([
      "pt-BR",
      "es",
    ]);
    expect(getOtherHeaderLanguages("es").map((item) => item.code)).toEqual([
      "pt-BR",
      "en",
    ]);
  });
});
