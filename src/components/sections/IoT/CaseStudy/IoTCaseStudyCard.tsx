import IoTCaseStudyDetailsPanel from "./IoTCaseStudyDetailsPanel";
import IoTCaseStudySummaryPanel from "./IoTCaseStudySummaryPanel";

export default function IoTCaseStudyCard() {
  return (
    <article
      data-iot-case-study-card
      className="mx-auto grid w-full max-w-[960px] min-h-[433.6px] grid-cols-1 overflow-hidden rounded-[24px] border border-[#E4E4E7] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:grid-cols-[383.2fr_574.8fr]"
    >
      <IoTCaseStudySummaryPanel />
      <IoTCaseStudyDetailsPanel />
    </article>
  );
}
