import { RequestDemoFieldError } from "../RequestDemoFieldGroup";
import { CONTACT_TYPE_FIELD_NAME } from "./contactType.constants";
import {
  contactTypeFieldsetClassName,
  contactTypeLegendClassName,
  contactTypeOptionClassName,
  contactTypeOptionsClassName,
} from "./contactType.styles";

type ContactTypeOption = {
  value: string;
  label: string;
};

type ContactTypeFieldProps = {
  legend: string;
  options: readonly ContactTypeOption[];
  errorMessage?: string;
};

export default function ContactTypeField({
  legend,
  options,
  errorMessage,
}: Readonly<ContactTypeFieldProps>) {
  const errorId = "request-demo-contactType-error";

  return (
    <fieldset
      data-request-demo-contact-type
      className={contactTypeFieldsetClassName}
      aria-invalid={Boolean(errorMessage)}
      aria-describedby={errorMessage ? errorId : undefined}
    >
      <legend className={contactTypeLegendClassName}>{legend}</legend>

      <div className={contactTypeOptionsClassName}>
        {options.map((option) => {
          const inputId = `request-demo-${CONTACT_TYPE_FIELD_NAME}-${option.value}`;

          return (
            <label key={option.value} htmlFor={inputId} className={contactTypeOptionClassName}>
              <input
                type="radio"
                id={inputId}
                name={CONTACT_TYPE_FIELD_NAME}
                value={option.value}
                required
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>

      <RequestDemoFieldError id={errorId} message={errorMessage} />
    </fieldset>
  );
}
