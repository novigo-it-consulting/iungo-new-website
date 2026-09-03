import RequestDemoTextareaField from "../RequestDemoTextareaField";
import {
  MESSAGE_FIELD_NAME,
  MESSAGE_LABEL,
  MESSAGE_PLACEHOLDER,
} from "./message.constants";
import { messageRowClassName, messageTextareaClassName } from "./message.styles";

export default function MessageField() {
  return (
    <div data-request-demo-message className={messageRowClassName}>
      <RequestDemoTextareaField
        id="request-demo-message"
        name={MESSAGE_FIELD_NAME}
        label={MESSAGE_LABEL}
        placeholder={MESSAGE_PLACEHOLDER}
        textareaClassName={messageTextareaClassName}
      />
    </div>
  );
}
