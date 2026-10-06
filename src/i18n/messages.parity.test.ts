import { describe, expect, it } from "vitest";

import { loadMessages } from "./loadMessages";
import { MESSAGE_NAMESPACES } from "./namespaces";
import { routing } from "./routing";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return prefix === "" ? [] : [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    collectKeys(child, prefix === "" ? key : `${prefix}.${key}`),
  );
}

function assertFilled(value: unknown, path: string): void {
  if (typeof value === "string") {
    expect(value.trim(), path).not.toBe("");
    return;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      assertFilled(child, path === "" ? key : `${path}.${key}`);
    }
  }
}

describe("paridade das mensagens", () => {
  const source = loadMessages("pt-BR");
  const sourceKeys = collectKeys(source).sort();

  it("declara cada namespace uma única vez", () => {
    expect(Object.keys(source).sort()).toEqual([...MESSAGE_NAMESPACES].sort());
  });

  it("repete as chaves do pt-BR em todos os locales, sem valor vazio", () => {
    for (const locale of routing.locales) {
      const messages = loadMessages(locale);
      expect(collectKeys(messages).sort(), locale).toEqual(sourceKeys);
      assertFilled(messages, locale);
    }
  });
});
