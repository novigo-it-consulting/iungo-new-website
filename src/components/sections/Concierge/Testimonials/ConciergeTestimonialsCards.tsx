import ConciergeTestimonialCard from "./ConciergeTestimonialCard";
import { CONCIERGE_TESTIMONIALS } from "./conciergeTestimonials.constants";

export default function ConciergeTestimonialsCards() {
  return (
    <ul
      data-concierge-testimonials-cards
      className="mt-10 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-2 xl:min-h-[339px]"
    >
      {CONCIERGE_TESTIMONIALS.map((testimonial) => (
        <li key={testimonial.id} className="min-w-0">
          <ConciergeTestimonialCard
            quote={testimonial.quote}
            initials={testimonial.initials}
            avatarClassName={testimonial.avatarClassName}
            name={testimonial.name}
            role={testimonial.role}
            metricValue={testimonial.metricValue}
            metricLabel={testimonial.metricLabel}
          />
        </li>
      ))}
    </ul>
  );
}
