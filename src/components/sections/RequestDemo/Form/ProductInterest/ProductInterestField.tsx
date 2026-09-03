import RequestDemoSelectField from "../RequestDemoSelectField";
import {
  PRODUCT_INTEREST_FIELD_NAME,
  PRODUCT_INTEREST_LABEL,
  PRODUCT_INTEREST_OPTIONS,
  PRODUCT_INTEREST_PLACEHOLDER,
} from "./productInterest.constants";
import { productInterestRowClassName } from "./productInterest.styles";

export default function ProductInterestField() {
  return (
    <div data-request-demo-product-interest className={productInterestRowClassName}>
      <RequestDemoSelectField
        id="request-demo-product-interest"
        name={PRODUCT_INTEREST_FIELD_NAME}
        label={PRODUCT_INTEREST_LABEL}
        placeholderOption={PRODUCT_INTEREST_PLACEHOLDER}
        options={PRODUCT_INTEREST_OPTIONS}
      />
    </div>
  );
}
