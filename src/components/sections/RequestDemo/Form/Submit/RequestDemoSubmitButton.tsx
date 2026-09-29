import {
  REQUEST_DEMO_SECURITY_NOTICE,
  REQUEST_DEMO_SUBMIT_LABEL,
  REQUEST_DEMO_SUBMITTING_LABEL,
} from "./submitButton.constants";
import {
  submitButtonClassName,
  submitButtonRowClassName,
  submitSecurityNoticeClassName,
} from "./submitButton.styles";

type RequestDemoSubmitButtonProps = {
  isSubmitting: boolean;
};

export default function RequestDemoSubmitButton({
  isSubmitting,
}: Readonly<RequestDemoSubmitButtonProps>) {
  return (
    <div data-request-demo-submit className={submitButtonRowClassName}>
      <button
        type="submit"
        className={submitButtonClassName}
        disabled={isSubmitting}
      >
        {isSubmitting ? REQUEST_DEMO_SUBMITTING_LABEL : REQUEST_DEMO_SUBMIT_LABEL}
      </button>

      <p data-request-demo-security-notice className={submitSecurityNoticeClassName}>
        {REQUEST_DEMO_SECURITY_NOTICE}
      </p>
    </div>
  );
}
