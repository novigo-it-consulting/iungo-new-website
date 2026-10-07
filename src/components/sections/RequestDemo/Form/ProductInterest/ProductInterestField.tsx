import type { RequestDemoSelectOption } from "../requestDemoForm.types";
import ProductInterestSelect from "./ProductInterestSelect";
import {
  PRODUCT_INTEREST_FIELD_NAME,
  PRODUCT_INTEREST_PLACEHOLDER,
} from "./productInterest.constants";
import { productInterestRowClassName } from "./productInterest.styles";

type ProductInterestFieldProps = {
  resetKey: number;
  errorMessage?: string;
  label: string;
  placeholder: string;
  options: readonly RequestDemoSelectOption[];
};

export default function ProductInterestField({
  resetKey,
  errorMessage,
  label,
  placeholder,
  options,
}: Readonly<ProductInterestFieldProps>) {
  return (
    <div data-request-demo-product-interest className={productInterestRowClassName}>
      <ProductInterestSelect
        key={resetKey}
        id="request-demo-product-interest"
        name={PRODUCT_INTEREST_FIELD_NAME}
        label={label}
        placeholderOption={{
          value: PRODUCT_INTEREST_PLACEHOLDER.value,
          label: placeholder,
        }}
        options={options}
        errorMessage={errorMessage}
      />
    </div>
  );
}
