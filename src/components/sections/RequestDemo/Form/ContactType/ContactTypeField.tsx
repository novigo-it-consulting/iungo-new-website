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

export default function ContactTypeField() {
  return (
    <fieldset
      data-request-demo-contact-type
      className={contactTypeFieldsetClassName}
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
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
