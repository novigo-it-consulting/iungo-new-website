import BehaviorFeatureCheckIcon from "./BehaviorFeatureCheckIcon";
import { BEHAVIOR_CDP_FEATURES } from "./behaviorCdpComparison.constants";

const miniContainerClassName = "flex w-full min-w-0 max-w-[567px] flex-col";

const titleClassName =
  "m-0 w-full font-reddit font-bold text-[#27272A] text-[28px] leading-[34px] tracking-[-0.56px] sm:text-[32px] sm:leading-[38px] sm:tracking-[-0.64px] xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]";

const bodyClassName =
  "m-0 font-reddit text-[14px] font-normal leading-[22px] text-[#71717A] xl:text-[16px] xl:leading-[24px]";

const featureClassName =
  "font-reddit text-[14px] font-normal leading-[20px] text-[#27272A]";

export default function BehaviorCdpComparisonContent() {
  return (
    <div
      data-behavior-cdp-comparison-content
      className="flex min-w-0 w-full max-w-[567px] flex-col gap-4"
    >
      <div
        data-behavior-cdp-comparison-title-block
        className={miniContainerClassName}
      >
        <h2
          id="behavior-cdp-comparison-title"
          data-behavior-cdp-comparison-title
          className={titleClassName}
        >
          Behavior CDP, não Traditional CDP.
        </h2>
      </div>

      <div
        data-behavior-cdp-comparison-paragraph-1-block
        className={miniContainerClassName}
      >
        <p data-behavior-cdp-comparison-paragraph-1 className={bodyClassName}>
          CDPs tradicionais consolidam dados em batches noturnos. Quando o time
          de marketing acorda, a oportunidade já passou.
        </p>
      </div>

      <div
        data-behavior-cdp-comparison-paragraph-2-block
        className={miniContainerClassName}
      >
        <p data-behavior-cdp-comparison-paragraph-2 className={bodyClassName}>
          O Iungo Behavior CDP processa eventos em{" "}
          <strong className="font-bold text-[#27272A]">&lt; 200ms</strong>,
          alimenta jornadas e sales agents instantaneamente, e mantém um perfil
          unificado vivo de cada cliente.
        </p>
      </div>

      <div
        data-behavior-cdp-comparison-features-block
        className={miniContainerClassName}
      >
        <ul
          data-behavior-cdp-comparison-features
          className="m-0 flex list-none flex-col gap-3 p-0 pr-2"
        >
          {BEHAVIOR_CDP_FEATURES.map((feature) => (
            <li
              key={feature}
              data-behavior-cdp-comparison-feature-item
              className="flex w-full min-w-0 items-start gap-3"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-[22px] w-5 shrink-0 items-center justify-center"
              >
                <BehaviorFeatureCheckIcon className="h-[10px] w-[14px] shrink-0" />
              </span>
              <span className={featureClassName}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
