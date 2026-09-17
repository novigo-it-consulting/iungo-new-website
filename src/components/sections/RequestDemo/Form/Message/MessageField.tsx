import RequestDemoTextareaField from "../RequestDemoTextareaField";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import {
  MESSAGE_FIELD_NAME,
  MESSAGE_LABEL,
  MESSAGE_PLACEHOLDER,
} from "./message.constants";
import { messageRowClassName, messageTextareaClassName } from "./message.styles";

type MessageFieldProps = {
  errorMessage?: string;
};

export default function MessageField({
  errorMessage,
}: Readonly<MessageFieldProps>) {
  return (
    <div data-request-demo-message className={messageRowClassName}>
      <RequestDemoTextareaField
        id="request-demo-message"
        name={MESSAGE_FIELD_NAME}
        label={MESSAGE_LABEL}
        placeholder={MESSAGE_PLACEHOLDER}
        maxLength={REQUEST_DEMO_FIELD_LIMITS.message}
        textareaClassName={messageTextareaClassName}
        errorMessage={errorMessage}
      />
    </div>
  );
}
