import Image from "next/image";

type ConciergeTestimonialCardProps = {
  quote: string;
  initials: string;
  avatarClassName: string;
  name: string;
  role: string;
  metricValue: string;
  metricLabel: string;
};

export default function ConciergeTestimonialCard({
  quote,
  initials,
  avatarClassName,
  name,
  role,
  metricValue,
  metricLabel,
}: ConciergeTestimonialCardProps) {
  return (
    <article
      data-concierge-testimonial-card
      className="flex min-h-[331px] w-full flex-col rounded-2xl border border-[#E4E4E7] bg-white p-8"
    >
      <div
        data-concierge-testimonial-quote
        className="flex w-full min-h-[48px] items-start"
      >
        <Image
          src="/icons/testimonial-quote.svg"
          alt=""
          aria-hidden="true"
          width={20}
          height={16}
          unoptimized
          className="h-4 w-5 shrink-0"
        />
      </div>

      <div
        data-concierge-testimonial-text-frame
        className="mt-4 w-full pb-2"
      >
        <blockquote className="m-0">
          <p
            data-concierge-testimonial-text
            className="font-reddit text-[16px] font-normal leading-[26px] tracking-normal text-[#27272A]"
          >
            {quote}
          </p>
        </blockquote>
      </div>

      <div
        data-concierge-testimonial-author
        className="mt-4 flex min-h-[73px] w-full items-center justify-between gap-4 border-t border-[#E4E4E7] pr-6 pt-6"
      >
        <div
          data-concierge-testimonial-identity
          className="flex min-w-0 items-center gap-4"
        >
          <div
            data-concierge-testimonial-avatar
            aria-hidden="true"
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-reddit text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-white ${avatarClassName}`}
          >
            {initials}
          </div>

          <div className="min-w-0">
            <p
              data-concierge-testimonial-name
              className="font-reddit text-[14px] font-semibold leading-[20px] tracking-[-0.28px] text-[#27272A]"
            >
              {name}
            </p>
            <p
              data-concierge-testimonial-role
              className="font-reddit text-[12px] font-normal leading-[16px] tracking-normal text-[#71717A]"
            >
              {role}
            </p>
          </div>
        </div>

        <div
          data-concierge-testimonial-metric
          className="flex shrink-0 flex-col items-end"
        >
          <p
            data-concierge-testimonial-metric-value
            className="font-reddit text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-[#A72121]"
          >
            {metricValue}
          </p>
          <p
            data-concierge-testimonial-metric-label
            className="font-reddit text-[10px] font-normal uppercase leading-[15px] tracking-normal text-[#71717A]"
          >
            {metricLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
