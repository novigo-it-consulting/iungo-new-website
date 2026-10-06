import RequestDemoTextareaField from "../RequestDemoTextareaField";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import { MESSAGE_FIELD_NAME } from "./message.constants";
import { messageRowClassName, messageTextareaClassName } from "./message.styles";

type MessageFieldProps = {
  label: string;
  placeholder: string;
  errorMessage?: string;
};

export default function MessageField({
  label,
  placeholder,
  errorMessage,
}: Readonly<MessageFieldProps>) {
  return (
    <div data-request-demo-message className={messageRowClassName}>
      <RequestDemoTextareaField
        id="request-demo-message"
        name={MESSAGE_FIELD_NAME}
        label={label}
        placeholder={placeholder}
        maxLength={REQUEST_DEMO_FIELD_LIMITS.message}
        textareaClassName={messageTextareaClassName}
        errorMessage={errorMessage}
      />
    </div>
  );
}
