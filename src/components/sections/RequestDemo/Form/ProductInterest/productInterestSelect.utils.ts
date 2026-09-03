import type { CSSProperties } from "react";

import type { RequestDemoSelectOption } from "../RequestDemoSelectField";

export const PANEL_GAP_PX = 4;
export const PANEL_MAX_HEIGHT_PX = 240;
export const VIEWPORT_MARGIN_PX = 16;

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
      onOpen(selectedIndex >= 0 ? selectedIndex : 0);
    }

    return;
  }

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      onActiveIndexChange(
        activeIndex < allOptions.length - 1 ? activeIndex + 1 : 0,
      );
      break;
    case "ArrowUp":
      event.preventDefault();
      onActiveIndexChange(
        activeIndex > 0 ? activeIndex - 1 : allOptions.length - 1,
      );
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      onSelect(allOptions[activeIndex] ?? placeholderOption);
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
