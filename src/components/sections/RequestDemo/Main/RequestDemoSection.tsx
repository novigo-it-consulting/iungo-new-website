import { getLocale } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import ContactCardsColumn from "@/components/sections/RequestDemo/ContactCards/ContactCardsColumn";
import RequestDemoFormCard from "@/components/sections/RequestDemo/Form/RequestDemoFormCard";
import { pickRequestDemoMessages } from "@/i18n/catalog/requestDemoCatalog";

import {
  buildRequestDemoFormCopy,
  localizeContactCards,
} from "../requestDemoView";
import { REQUEST_DEMO_TITLE_TO_MAIN_GAP_CLASS } from "./requestDemo.constants";
import {
  requestDemoFormColumnClassName,
  requestDemoMainContainerClassName,
  requestDemoMainLayoutClassName,
  requestDemoPageFrameClassName,
  requestDemoSectionClassName,
  requestDemoTitleClassName,
} from "./requestDemo.styles";

import "./requestDemo.css";

export default async function RequestDemoSection() {
  const messages = pickRequestDemoMessages(await getLocale());

  return (
    <section
      data-request-demo-section
      data-gradient-section
      aria-labelledby="request-demo-title"
      className={requestDemoSectionClassName}
    >
      <PageContainer
        data-request-demo-frame
        size="content1264"
        className={requestDemoPageFrameClassName}
      >
        <h1 id="request-demo-title" className={requestDemoTitleClassName}>
          {messages.title}
        </h1>

        <div
          data-request-demo-main-container
          className={`${requestDemoMainContainerClassName} ${REQUEST_DEMO_TITLE_TO_MAIN_GAP_CLASS}`}
        >
          <div
            data-request-demo-main-layout
            data-demo-cards-container
            className={requestDemoMainLayoutClassName}
          >
            <div data-demo-form-card className={requestDemoFormColumnClassName}>
              <RequestDemoFormCard copy={buildRequestDemoFormCopy(messages)} />
            </div>

            <ContactCardsColumn
              label={messages.contactAside}
              cards={localizeContactCards(messages.cards)}
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
