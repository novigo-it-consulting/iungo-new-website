function isWhitespace(char: string): boolean {
  return char.trim() === "";
}

/** Tira tags `<...>` e junta espaços. O mesmo resultado da troca antiga por regex. */
export function plainMessage(value: string): string {
  let withoutTags = "";
  let index = 0;

  while (index < value.length) {
    const open = value.indexOf("<", index);
    if (open < 0) {
      withoutTags += value.slice(index);
      break;
    }

    withoutTags += value.slice(index, open);
    const close = value.indexOf(">", open + 1);
    if (close < 0) {
      withoutTags += value.slice(open);
      break;
    }

    withoutTags += close === open + 1 ? "<>" : " ";
    index = close + 1;
  }

  let collapsed = "";
  let previousWasSpace = false;

  for (const char of withoutTags) {
    if (!isWhitespace(char)) {
      collapsed += char;
      previousWasSpace = false;
      continue;
    }

    if (!previousWasSpace) {
      collapsed += " ";
      previousWasSpace = true;
    }
  }

  return collapsed.trim();
}
