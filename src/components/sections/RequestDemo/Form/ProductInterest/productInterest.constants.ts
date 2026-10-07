import { FIRST_ROW_PRODUCTS, SECOND_ROW_PRODUCTS } from "@/components/sections/Products/products.constants";
import type { RequestDemoSelectOption } from "../requestDemoForm.types";

export const PRODUCT_INTEREST_FIELD_NAME = "productInterest" as const;

export const PRODUCT_INTEREST_PLACEHOLDER: RequestDemoSelectOption = {
  value: "",
  label: "Selecione...",
};

export const PRODUCT_INTEREST_OPTIONS: readonly RequestDemoSelectOption[] = [
  ...FIRST_ROW_PRODUCTS,
  ...SECOND_ROW_PRODUCTS,
].map(({ id, name }) => ({ value: id, label: name }));
