import type { CSSProperties } from "react";

import type { RequestDemoSelectOption } from "../requestDemoForm.types";

export const PANEL_GAP_PX = 4;
export const PANEL_MAX_HEIGHT_PX = 240;
export const VIEWPORT_MARGIN_PX = 16;

export function clampActiveIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

export function getActiveOption(
  allOptions: readonly RequestDemoSelectOption[],
  activeIndex: number,
  placeholderOption: RequestDemoSelectOption,
): RequestDemoSelectOption {
  if (allOptions.length === 0) {
    return placeholderOption;
  }

  const safeIndex = clampActiveIndex(activeIndex, allOptions.length);
  return allOptions[safeIndex] ?? placeholderOption;
}

export function getPanelStyle(trigger: HTMLElement): CSSProperties {
  const rect = trigger.getBoundingClientRect();
  const maxHeight = Math.min(
    PANEL_MAX_HEIGHT_PX,
    window.innerHeight - VIEWPORT_MARGIN_PX * 2,
  );
  const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP_PX;
  const spaceAbove = rect.top - PANEL_GAP_PX;
  const openUpward = spaceBelow < maxHeight && spaceAbove > spaceBelow;

  if (openUpward) {
    return {
      position: "fixed",
      left: rect.left,
      width: rect.width,
      bottom: window.innerHeight - rect.top + PANEL_GAP_PX,
      maxHeight: Math.min(maxHeight, spaceAbove),
    };
  }

  return {
    position: "fixed",
    left: rect.left,
    width: rect.width,
    top: rect.bottom + PANEL_GAP_PX,
    maxHeight: Math.min(maxHeight, spaceBelow),
  };
}

type HandleComboboxKeyDownParams = {
  event: React.KeyboardEvent<HTMLButtonElement>;
  isOpen: boolean;
  allOptions: readonly RequestDemoSelectOption[];
  selectedValue: string;
  activeIndex: number;
  placeholderOption: RequestDemoSelectOption;
  onOpen: (index: number) => void;
  onClose: () => void;
  onDismiss: () => void;
  onSelect: (option: RequestDemoSelectOption) => void;
  onActiveIndexChange: (index: number) => void;
};

export function handleComboboxKeyDown({
  event,
  isOpen,
  allOptions,
  selectedValue,
  activeIndex,
  placeholderOption,
  onOpen,
  onClose,
  onDismiss,
  onSelect,
  onActiveIndexChange,
}: HandleComboboxKeyDownParams) {
  const optionCount = allOptions.length;

  if (optionCount === 0) {
    return;
  }

  const safeActiveIndex = clampActiveIndex(activeIndex, optionCount);

  if (!isOpen) {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      const selectedIndex = allOptions.findIndex(
        (option) => option.value === selectedValue,
      );
      onOpen(clampActiveIndex(Math.max(selectedIndex, 0), optionCount));
    }

    return;
  }

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      onActiveIndexChange(
        clampActiveIndex(
          safeActiveIndex < optionCount - 1 ? safeActiveIndex + 1 : 0,
          optionCount,
        ),
      );
      break;
    case "ArrowUp":
      event.preventDefault();
      onActiveIndexChange(
        clampActiveIndex(
          safeActiveIndex > 0 ? safeActiveIndex - 1 : optionCount - 1,
          optionCount,
        ),
      );
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      onSelect(getActiveOption(allOptions, safeActiveIndex, placeholderOption));
      break;
    case "Escape":
      event.preventDefault();
      onClose();
      break;
    case "Tab":
      onDismiss();
      break;
    default:
      break;
  }
}

export function getOptionClassName({
  isHighlighted,
  isSelected,
  baseClassName,
  highlightedClassName,
  selectedClassName,
}: {
  isHighlighted: boolean;
  isSelected: boolean;
  baseClassName: string;
  highlightedClassName: string;
  selectedClassName: string;
}) {
  return [
    baseClassName,
    isHighlighted ? highlightedClassName : "",
    isSelected ? selectedClassName : "",
  ]
    .filter(Boolean)
    .join(" ");
}
