import PageContainer from "@/components/layout/PageContainer";
import ContactCardsColumn from "@/components/sections/RequestDemo/ContactCards/ContactCardsColumn";
import RequestDemoFormCard from "@/components/sections/RequestDemo/Form/RequestDemoFormCard";

import { REQUEST_DEMO_TITLE, REQUEST_DEMO_TITLE_TO_MAIN_GAP_CLASS } from "./requestDemo.constants";
import {
  requestDemoFormColumnClassName,
  requestDemoMainContainerClassName,
  requestDemoMainLayoutClassName,
  requestDemoPageFrameClassName,
  requestDemoSectionClassName,
  requestDemoTitleClassName,
} from "./requestDemo.styles";

import "./requestDemo.css";

export default function RequestDemoSection() {
  return (
    <section
      data-request-demo-section
      data-gradient-section
      aria-labelledby="request-demo-title"
      className={requestDemoSectionClassName}
    >
      <PageContainer
        data-request-demo-frame
        size="organizer"
        className={requestDemoPageFrameClassName}
      >
        <h1 id="request-demo-title" className={requestDemoTitleClassName}>
          {REQUEST_DEMO_TITLE}
        </h1>

        <div
          data-request-demo-main-container
          className={`${requestDemoMainContainerClassName} ${REQUEST_DEMO_TITLE_TO_MAIN_GAP_CLASS}`}
        >
          <div
            data-request-demo-main-layout
            className={requestDemoMainLayoutClassName}
          >
            <div className={requestDemoFormColumnClassName}>
              <RequestDemoFormCard />
            </div>

            <ContactCardsColumn />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
