import BehaviorCdpComparisonContent from "./BehaviorCdpComparisonContent";
import BehaviorCdpComparisonVisual from "./BehaviorCdpComparisonVisual";

export default function BehaviorCdpComparison() {
  return (
    <div
      data-behavior-cdp-comparison
      aria-labelledby="behavior-cdp-comparison-title"
      className="mt-[64px] grid min-w-0 grid-cols-1 gap-y-12 xl:min-h-[394px] xl:grid-cols-[minmax(0,567fr)_minmax(0,601fr)] xl:gap-x-12 xl:gap-y-0"
    >
      <div
        data-behavior-cdp-comparison-copy-column
        className="min-w-0 xl:min-h-[394px] xl:pl-8"
      >
        <BehaviorCdpComparisonContent />
      </div>

      <BehaviorCdpComparisonVisual />
    </div>
  );
}
