/**
 * Diz se o foco saiu de fato para um elemento fora das raízes.
 * relatedTarget nulo (clique no Safari e no Firefox do macOS) não fecha:
 * nesses navegadores o clique não move o foco, então o alvo vem vazio.
 */
export function focusMovedOutside(
  relatedTarget: EventTarget | null,
  ...roots: Array<Node | null | undefined>
): boolean {
  if (!(relatedTarget instanceof Node)) {
    return false;
  }

  return roots.every((root) => !root?.contains(relatedTarget));
}
