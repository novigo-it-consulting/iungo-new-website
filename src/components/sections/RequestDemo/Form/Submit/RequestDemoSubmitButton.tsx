import {
  REQUEST_DEMO_SECURITY_NOTICE,
  REQUEST_DEMO_SUBMIT_LABEL,
} from "./submitButton.constants";
import {
  submitButtonClassName,
  submitButtonRowClassName,
  submitSecurityNoticeClassName,
} from "./submitButton.styles";

export default function RequestDemoSubmitButton() {
  return (
    <div data-request-demo-submit className={submitButtonRowClassName}>
      <button type="submit" className={submitButtonClassName}>
        {REQUEST_DEMO_SUBMIT_LABEL}
      </button>

      <p data-request-demo-security-notice className={submitSecurityNoticeClassName}>
        {REQUEST_DEMO_SECURITY_NOTICE}
      </p>
    </div>
  );
}
