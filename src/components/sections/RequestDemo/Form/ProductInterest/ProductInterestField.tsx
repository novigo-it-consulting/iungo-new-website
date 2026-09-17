import ProductInterestSelect from "./ProductInterestSelect";
import {
  PRODUCT_INTEREST_FIELD_NAME,
  PRODUCT_INTEREST_LABEL,
  PRODUCT_INTEREST_OPTIONS,
  PRODUCT_INTEREST_PLACEHOLDER,
} from "./productInterest.constants";
import { productInterestRowClassName } from "./productInterest.styles";

type ProductInterestFieldProps = {
  resetKey: number;
  errorMessage?: string;
};

export default function ProductInterestField({
  resetKey,
  errorMessage,
}: Readonly<ProductInterestFieldProps>) {
  return (
    <div data-request-demo-product-interest className={productInterestRowClassName}>
      <ProductInterestSelect
        key={resetKey}
        id="request-demo-product-interest"
        name={PRODUCT_INTEREST_FIELD_NAME}
        label={PRODUCT_INTEREST_LABEL}
        placeholderOption={PRODUCT_INTEREST_PLACEHOLDER}
        options={PRODUCT_INTEREST_OPTIONS}
        errorMessage={errorMessage}
      />
    </div>
  );
}
