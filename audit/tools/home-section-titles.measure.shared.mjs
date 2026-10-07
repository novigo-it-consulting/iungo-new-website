/**
 * O navegador só lê fonte e line-height.
 * O arredondamento fica no Node, fora do page.evaluate.
 */
export function readTitleNodes(selectors) {
  const overflowX = document.documentElement.scrollWidth > window.innerWidth + 1;
  const metrics = {};

  for (const key of Object.keys(selectors)) {
    const node = document.querySelector(selectors[key]);
    if (!(node instanceof HTMLElement)) {
      metrics[key] = null;
      continue;
    }
    const styles = getComputedStyle(node);
    metrics[key] = {
      fontSize: Number.parseFloat(styles.fontSize),
      lineHeight: Number.parseFloat(styles.lineHeight),
      overflowX,
    };
  }

  return metrics;
}

function roundTitleNode(item) {
  if (!item) {
    return null;
  }
  return {
    fontSize: Math.round(item.fontSize * 10) / 10,
    lineHeight: Math.round(item.lineHeight * 10) / 10,
    overflowX: item.overflowX,
  };
}

export function roundTitleMetrics(raw) {
  const rounded = {};
  for (const key of Object.keys(raw)) {
    rounded[key] = roundTitleNode(raw[key]);
  }
  return rounded;
}
