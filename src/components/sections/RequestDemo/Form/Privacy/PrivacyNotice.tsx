import Link from "next/link";

import {
  PRIVACY_NOTICE_DPO_EMAIL,
  PRIVACY_POLICY_HREF,
} from "./privacyNotice.constants";
import {
  privacyNoticeBlockClassName,
  privacyNoticeDotsClassName,
  privacyNoticeEmailClassName,
  privacyNoticeLinkClassName,
  privacyNoticeRowClassName,
  privacyNoticeTextClassName,
} from "./privacyNotice.styles";

export default function PrivacyNotice() {
  return (
    <div data-request-demo-privacy-notice className={privacyNoticeRowClassName}>
      <div className={privacyNoticeBlockClassName}>
        <span
          aria-hidden="true"
          className={privacyNoticeDotsClassName}
        >
          ...
        </span>

        <p className={privacyNoticeTextClassName}>
          Li e concordo com a{" "}
          {PRIVACY_POLICY_HREF ? (
            <Link
              href={PRIVACY_POLICY_HREF}
              className={privacyNoticeLinkClassName}
            >
              Política de Privacidade
            </Link>
          ) : (
            <span className={privacyNoticeLinkClassName}>
              Política de Privacidade
            </span>
          )}
          . Autorizo a Iungo Intelligence a tratar meus dados pessoais para fins
          de retorno comercial, conforme art. 7º, I e V da LGPD. Posso revogar
          este consentimento a qualquer momento via{" "}
          <a
            href={`mailto:${PRIVACY_NOTICE_DPO_EMAIL}`}
            className={privacyNoticeEmailClassName}
          >
            {PRIVACY_NOTICE_DPO_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
