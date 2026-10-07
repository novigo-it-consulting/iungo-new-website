import { Link } from "@/i18n/navigation";

import { isAvailableHref } from "@/constants/routes";

import {
  PRIVACY_NOTICE_CONTACT_EMAIL,
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

type PrivacyNoticeProps = {
  beforePolicy: string;
  policy: string;
  between: string;
  afterEmail: string;
};

export default function PrivacyNotice({
  beforePolicy,
  policy,
  between,
  afterEmail,
}: Readonly<PrivacyNoticeProps>) {
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
          {beforePolicy}
          {isAvailableHref(PRIVACY_POLICY_HREF) ? (
            <Link
              href={PRIVACY_POLICY_HREF}
              className={privacyNoticeLinkClassName}
            >
              {policy}
            </Link>
          ) : (
            <span className={privacyNoticeLinkClassName}>{policy}</span>
          )}
          {between}
          <a
            href={`mailto:${PRIVACY_NOTICE_CONTACT_EMAIL}`}
            className={privacyNoticeEmailClassName}
          >
            {PRIVACY_NOTICE_CONTACT_EMAIL}
          </a>
          {afterEmail}
        </p>
      </div>
    </div>
  );
}
