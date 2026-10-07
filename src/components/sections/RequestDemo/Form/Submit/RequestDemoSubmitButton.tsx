import {
  submitButtonClassName,
  submitButtonRowClassName,
  submitSecurityNoticeClassName,
} from "./submitButton.styles";

type RequestDemoSubmitButtonProps = {
  isSubmitting: boolean;
  label: string;
  submittingLabel: string;
  securityNotice: string;
};

export default function RequestDemoSubmitButton({
  isSubmitting,
  label,
  submittingLabel,
  securityNotice,
}: Readonly<RequestDemoSubmitButtonProps>) {
  return (
    <div data-request-demo-submit className={submitButtonRowClassName}>
      <button
        type="submit"
        className={submitButtonClassName}
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : label}
      </button>

      <p data-request-demo-security-notice className={submitSecurityNoticeClassName}>
        {securityNotice}
      </p>
    </div>
  );
}
