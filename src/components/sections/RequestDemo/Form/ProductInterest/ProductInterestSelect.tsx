"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

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
import {
  getOptionClassName,
  getPanelStyle,
  handleComboboxKeyDown,
} from "./productInterestSelect.utils";

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
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  const allOptions = useMemo(
    () => [placeholderOption, ...options],
    [options, placeholderOption],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholderOption.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  const selectedOption =
    allOptions.find((option) => option.value === selectedValue) ??
    placeholderOption;

  const updatePanelPosition = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    setPanelStyle(getPanelStyle(triggerRef.current));
  }, []);

  const openList = useCallback((index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const closeList = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const dismissList = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback((option: RequestDemoSelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePanelPosition();
  }, [isOpen, allOptions.length, updatePanelPosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleReposition = () => updatePanelPosition();

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen, updatePanelPosition]);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen]);

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    handleComboboxKeyDown({
      event,
      isOpen,
      allOptions,
      selectedValue,
      activeIndex,
      placeholderOption,
      onOpen: openList,
      onClose: closeList,
      onDismiss: dismissList,
      onSelect: selectOption,
      onActiveIndexChange: setActiveIndex,
    });
  };

  const handleTriggerClick = () => {
    if (isOpen) {
      closeList();
      return;
    }

    const selectedIndex = allOptions.findIndex(
      (option) => option.value === selectedValue,
    );
    openList(selectedIndex >= 0 ? selectedIndex : 0);
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
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        >
          {selectedOption.label}
        </button>

        {isOpen ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            style={panelStyle}
            className={productInterestSelectPanelClassName}
          >
            {allOptions.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isHighlighted = index === activeIndex;

              return (
                <li
                  key={option.value || "placeholder"}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={getOptionClassName({
                    isHighlighted,
                    isSelected,
                    baseClassName: productInterestSelectOptionBaseClassName,
                    highlightedClassName:
                      productInterestSelectOptionHighlightedClassName,
                    selectedClassName:
                      productInterestSelectOptionSelectedClassName,
                  })}
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
