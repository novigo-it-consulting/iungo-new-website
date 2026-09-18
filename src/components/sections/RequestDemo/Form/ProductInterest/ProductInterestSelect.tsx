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

import { RequestDemoFieldError } from "../RequestDemoFieldGroup";
import type { RequestDemoSelectOption } from "../requestDemoForm.types";
import {
  requestDemoFieldGroupClassName,
  requestDemoSelectClassName,
  requestDemoTextFieldLabelClassName,
  withRequestDemoInvalidClass,
} from "../requestDemoField.styles";

import {
  productInterestSelectControlClassName,
  productInterestSelectOptionBaseClassName,
  productInterestSelectOptionHighlightedClassName,
  productInterestSelectOptionSelectedClassName,
  productInterestSelectPanelClassName,
} from "./productInterestSelect.styles";
import {
  clampActiveIndex,
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
  errorMessage?: string;
};

export default function ProductInterestSelect({
  id,
  label,
  name,
  placeholderOption,
  options,
  errorMessage,
}: Readonly<ProductInterestSelectProps>) {
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const controlRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const safeActiveIndex = clampActiveIndex(activeIndex, allOptions.length);

  const updatePanelPosition = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    setPanelStyle(getPanelStyle(triggerRef.current));
  }, []);

  const openList = useCallback(
    (index: number) => {
      setActiveIndex(clampActiveIndex(index, allOptions.length));
      setIsOpen(true);
    },
    [allOptions.length],
  );

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

    optionRefs.current[safeActiveIndex]?.scrollIntoView({ block: "nearest" });
  }, [safeActiveIndex, isOpen]);

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
    openList(
      clampActiveIndex(Math.max(selectedIndex, 0), allOptions.length),
    );
  };

  const triggerClassName = withRequestDemoInvalidClass(
    `${requestDemoSelectClassName} flex cursor-pointer items-center text-left`,
    errorMessage,
  );

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
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? errorId : undefined}
          aria-activedescendant={
            isOpen ? `${id}-option-${safeActiveIndex}` : undefined
          }
          className={triggerClassName}
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
              const isHighlighted = index === safeActiveIndex;

              return (
                <li key={option.value || "placeholder"} role="presentation">
                  <button
                    type="button"
                    ref={(element) => {
                      optionRefs.current[index] = element;
                    }}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    className={getOptionClassName({
                      isHighlighted,
                      isSelected,
                      baseClassName: `${productInterestSelectOptionBaseClassName} w-full text-left`,
                      highlightedClassName:
                        productInterestSelectOptionHighlightedClassName,
                      selectedClassName:
                        productInterestSelectOptionSelectedClassName,
                    })}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <RequestDemoFieldError id={errorId} message={errorMessage} />
    </div>
  );
}
