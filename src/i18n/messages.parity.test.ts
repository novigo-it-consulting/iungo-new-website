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

function collectStrings(value: unknown, prefix = ""): Array<[string, string]> {
  if (typeof value === "string") {
    return [[prefix, value]];
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      collectStrings(child, prefix === "" ? key : `${prefix}.${key}`),
    );
  }

  return [];
}

function markupSignature(value: string): string {
  const tags = [...value.matchAll(/<\/?[A-Za-z][A-Za-z0-9]*\s*\/?>/g)].map(
    (match) => match[0],
  );
  const placeholders = [...value.matchAll(/\{[A-Za-z0-9_]+\}/g)].map(
    (match) => match[0],
  );
  return JSON.stringify({ tags, placeholders });
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

  it("repete placeholders e tags de rich text do pt-BR", () => {
    const sourceMarkup = new Map(
      collectStrings(source).map(([key, value]) => [key, markupSignature(value)]),
    );

    for (const locale of routing.locales) {
      for (const [key, value] of collectStrings(loadMessages(locale))) {
        expect(markupSignature(value), `${locale}:${key}`).toBe(sourceMarkup.get(key));
      }
    }
  });
});
