import { RequestDemoFieldError } from "../RequestDemoFieldGroup";
import {
  CONTACT_TYPE_FIELD_NAME,
  CONTACT_TYPE_LEGEND,
  CONTACT_TYPE_OPTIONS,
} from "./contactType.constants";
import {
  contactTypeFieldsetClassName,
  contactTypeLegendClassName,
  contactTypeOptionClassName,
  contactTypeOptionsClassName,
} from "./contactType.styles";

type ContactTypeFieldProps = {
  errorMessage?: string;
};

export default function ContactTypeField({
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
      <legend className={contactTypeLegendClassName}>{CONTACT_TYPE_LEGEND}</legend>

      <div className={contactTypeOptionsClassName}>
        {CONTACT_TYPE_OPTIONS.map((option) => {
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
