/**
 * Verificação: Hero mobile das páginas de produtos (imagem acima do botão).
 * node verify-product-hero.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  withAuditBrowser,
} from "./mobile-nav-audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const LG_MIN_WIDTH = 1024;

const PRODUCTS = [
  { slug: "organizer", path: "/produtos/organizer" },
  { slug: "attendant", path: "/produtos/attendant" },
  { slug: "behavior", path: "/produtos/behavior" },
  { slug: "concierge", path: "/produtos/concierge" },
  { slug: "convert", path: "/produtos/convert" },
  { slug: "iot", path: "/produtos/iot" },
  { slug: "resolve", path: "/produtos/resolve" },
];

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1023", width: 1023, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

function readProductHeroMetrics(slug) {
  function roundBox(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }

  function readElementText(element) {
    const text = element.textContent;
    if (typeof text !== "string") {
      return "";
    }
    return text.replace(/\s+/g, " ").trim();
  }

  const section = document.querySelector(`[data-${slug}-hero-section]`);
  const container = document.querySelector(`[data-${slug}-hero-container]`);
  const content = document.querySelector(`[data-${slug}-hero-content]`);
  const visual = document.querySelector(`[data-${slug}-hero-visual]`);
  const cta = document.querySelector(`[data-${slug}-hero-cta]`);

  if (
    !(section instanceof HTMLElement) ||
    !(container instanceof HTMLElement) ||
    !(content instanceof HTMLElement) ||
    !(visual instanceof HTMLElement) ||
    !(cta instanceof HTMLElement)
  ) {
    return null;
  }

  const button = cta.querySelector("a");
  if (!(button instanceof HTMLAnchorElement)) {
    return null;
  }

  const image = visual.querySelector("img");
  const sectionBox = roundBox(section);
  const contentBox = roundBox(content);
  const visualBox = roundBox(visual);
  const ctaBox = roundBox(cta);
  const buttonBox = roundBox(button);
  const containerBox = roundBox(container);
  const buttonStyles = getComputedStyle(button);
  const containerCenter = containerBox.left + containerBox.width / 2;
  const buttonCenter = buttonBox.left + buttonBox.width / 2;

  return {
    contentTop: contentBox.top,
    contentBottom: contentBox.bottom,
    contentLeft: contentBox.left,
    contentRight: contentBox.right,
    visualTop: visualBox.top,
    visualBottom: visualBox.bottom,
    visualLeft: visualBox.left,
    visualRight: visualBox.right,
    ctaTop: ctaBox.top,
    buttonTop: buttonBox.top,
    buttonLeft: buttonBox.left,
    buttonWidth: buttonBox.width,
    buttonHeight: buttonBox.height,
    buttonCenterOffset: Math.abs(buttonCenter - containerCenter),
    buttonText: readElementText(button),
    buttonOverflow: button.scrollWidth > button.clientWidth + 1,
    buttonEllipsis: buttonStyles.textOverflow === "ellipsis",
    imageWidth: image instanceof HTMLElement ? roundBox(image).width : 0,
    imageHeight: image instanceof HTMLElement ? roundBox(image).height : 0,
    sectionRight: sectionBox.right,
    buttonRight: buttonBox.right,
    viewportWidth: window.innerWidth,
  };
}

function recordProductHeroAssertions(slug, viewport, metrics) {
  const label = `${slug}@${viewport.name}`;
  const isDesktop = viewport.width >= LG_MIN_WIDTH;

  if (isDesktop) {
    record(`${label}:copy-left-of-image`, metrics.visualLeft >= metrics.contentRight - 8, {
      contentRight: metrics.contentRight,
      visualLeft: metrics.visualLeft,
    });
    record(`${label}:button-below-copy`, metrics.ctaTop >= metrics.contentBottom - 2, {
      contentBottom: metrics.contentBottom,
      ctaTop: metrics.ctaTop,
    });
    record(`${label}:button-left-aligned`, Math.abs(metrics.buttonLeft - metrics.contentLeft) <= 16, {
      buttonLeft: metrics.buttonLeft,
      contentLeft: metrics.contentLeft,
    });
  } else {
    record(
      `${label}:copy-then-image`,
      metrics.contentTop <= metrics.visualTop &&
        metrics.contentBottom <= metrics.visualTop + 8,
      {
        contentBottom: metrics.contentBottom,
        visualTop: metrics.visualTop,
      },
    );
    record(
      `${label}:image-before-button`,
      metrics.visualBottom <= metrics.ctaTop + 1,
      {
        visualBottom: metrics.visualBottom,
        ctaTop: metrics.ctaTop,
      },
    );
    record(`${label}:button-centered`, metrics.buttonCenterOffset <= 12, {
      buttonCenterOffset: metrics.buttonCenterOffset,
      buttonLeft: metrics.buttonLeft,
      buttonWidth: metrics.buttonWidth,
    });
  }

  const minTouch = isDesktop && viewport.width >= 1280 ? 41 : 44;
  record(`${label}:touch-target`, metrics.buttonHeight >= minTouch, {
    buttonHeight: metrics.buttonHeight,
    minTouch,
  });
  record(
    `${label}:full-label`,
    metrics.buttonText === "Solicitar Demonstração" &&
      metrics.buttonOverflow === false &&
      metrics.buttonEllipsis === false,
    {
      buttonText: metrics.buttonText,
      buttonOverflow: metrics.buttonOverflow,
    },
  );
  record(
    `${label}:hero-within-viewport`,
    metrics.sectionRight <= metrics.viewportWidth + 1 &&
      metrics.visualRight <= metrics.viewportWidth + 1 &&
      metrics.buttonRight <= metrics.viewportWidth + 1,
    {
      sectionRight: metrics.sectionRight,
      visualRight: metrics.visualRight,
      buttonRight: metrics.buttonRight,
      viewportWidth: metrics.viewportWidth,
    },
  );
  record(`${label}:image-visible`, metrics.imageWidth > 80 && metrics.imageHeight > 80, {
    imageWidth: metrics.imageWidth,
    imageHeight: metrics.imageHeight,
  });
}

try {
  await withAuditBrowser(async (page) => {
    for (const product of PRODUCTS) {
      await page.goto(`${AUDIT_BASE_URL}${product.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForSelector(`[data-${product.slug}-hero-section]`, {
        timeout: 15000,
      });

      for (const viewport of VIEWPORTS) {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        const metrics = await page.evaluate(readProductHeroMetrics, product.slug);
        if (!metrics) {
          record(`${product.slug}@${viewport.name}:hero`, false, "missing-nodes");
          continue;
        }
        recordProductHeroAssertions(product.slug, viewport, metrics);
      }
    }
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
