import TestimonialCard from "@/components/ui/TestimonialCard";

import { RESOLVE_TESTIMONIALS } from "./resolveTestimonials.constants";

export default function ResolveTestimonialsCards() {
  return (
    <ul
      data-resolve-testimonials-cards
      className="mt-10 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {RESOLVE_TESTIMONIALS.map((testimonial) => (
        <li key={testimonial.id} className="min-w-0">
          <TestimonialCard
            variant="resolve"
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
