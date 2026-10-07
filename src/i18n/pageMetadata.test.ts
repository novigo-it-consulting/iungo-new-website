import { describe, expect, it } from "vitest";

import { plainMessage } from "./plainMessage";

describe("plainMessage", () => {
  it("devolve o texto quando não há tags", () => {
    expect(
      plainMessage(
        "O melhor AI PIM para enriquecer catálogos com IA generativa.",
      ),
    ).toBe("O melhor AI PIM para enriquecer catálogos com IA generativa.");
  });

  it("troca br, line, highlight e strong por espaço e junta os espaços", () => {
    expect(plainMessage("Responde.<br></br>Cancela pedido.")).toBe(
      "Responde. Cancela pedido.",
    );
    expect(
      plainMessage(
        "<line>Catálogo. Cliente.</line><line>Atendimento.</line><highlight>Em uma IA.</highlight>",
      ),
    ).toBe("Catálogo. Cliente. Atendimento. Em uma IA.");
    expect(plainMessage("perdem em média <strong>3,2%</strong> de receita")).toBe(
      "perdem em média 3,2% de receita",
    );
  });

  it("remove espaços do começo e do fim", () => {
    expect(plainMessage("  título  ")).toBe("título");
    expect(plainMessage("<br></br>")).toBe("");
    expect(plainMessage("  <strong>ok</strong>  ")).toBe("ok");
  });

  it("trata tag com atributo como a tag inteira", () => {
    expect(plainMessage('antes<br class="max-xl:hidden"></br>depois')).toBe(
      "antes depois",
    );
  });

  it("não mexe em menor-que que não fecha, nem em <>", () => {
    expect(plainMessage("eventos em < 200ms")).toBe("eventos em < 200ms");
    expect(plainMessage("vazio <> aqui")).toBe("vazio <> aqui");
    expect(plainMessage("sem fechar <br")).toBe("sem fechar <br");
  });

  it("engole do primeiro < até o próximo > , como a regex antiga", () => {
    expect(plainMessage("em <strong>< 200ms</strong>, segue")).toBe(
      "em , segue",
    );
  });
});
