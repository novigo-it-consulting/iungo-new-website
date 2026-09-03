"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { RequestDemoSelectOption } from "../RequestDemoSelectField";
import {
  requestDemoFieldGroupClassName,
  requestDemoSelectClassName,
  requestDemoTextFieldLabelClassName,
} from "../requestDemoField.styles";

import {
  productInterestSelectControlClassName,
  productInterestSelectOptionBaseClassName,
  productInterestSelectOptionHighlightedClassName,
  productInterestSelectOptionSelectedClassName,
  productInterestSelectPanelClassName,
} from "./productInterestSelect.styles";

type ProductInterestSelectProps = {
  id: string;
  label: string;
  name: string;
  placeholderOption: RequestDemoSelectOption;
  options: readonly RequestDemoSelectOption[];
};

export default function ProductInterestSelect({
  id,
  label,
  name,
  placeholderOption,
  options,
}: ProductInterestSelectProps) {
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;
  const controlRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const allOptions = useMemo(
    () => [placeholderOption, ...options],
    [options, placeholderOption],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholderOption.value);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedOption =
    allOptions.find((option) => option.value === selectedValue) ??
    placeholderOption;

  const openList = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeList = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectOption = (option: RequestDemoSelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!controlRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
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
        openList(selectedIndex >= 0 ? selectedIndex : 0);
      }

      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((current) =>
          current < allOptions.length - 1 ? current + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((current) =>
          current > 0 ? current - 1 : allOptions.length - 1,
        );
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(allOptions[activeIndex] ?? placeholderOption);
        break;
      case "Escape":
        event.preventDefault();
        closeList();
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={requestDemoFieldGroupClassName}>
      <label id={labelId} htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>

      <input type="hidden" name={name} value={selectedValue} />

      <div ref={controlRef} className={productInterestSelectControlClassName}>
        <button
          ref={triggerRef}
          type="button"
          id={id}
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          aria-activedescendant={
            isOpen ? `${id}-option-${activeIndex}` : undefined
          }
          className={`${requestDemoSelectClassName} flex cursor-pointer items-center text-left`}
          onClick={() => {
            if (isOpen) {
              closeList();
              return;
            }

            const selectedIndex = allOptions.findIndex(
              (option) => option.value === selectedValue,
            );
            openList(selectedIndex >= 0 ? selectedIndex : 0);
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          {selectedOption.label}
        </button>

        {isOpen ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className={productInterestSelectPanelClassName}
          >
            {allOptions.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isHighlighted = index === activeIndex;

              return (
                <li
                  key={option.value || "placeholder"}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    productInterestSelectOptionBaseClassName,
                    isHighlighted
                      ? productInterestSelectOptionHighlightedClassName
                      : "",
                    isSelected
                      ? productInterestSelectOptionSelectedClassName
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
