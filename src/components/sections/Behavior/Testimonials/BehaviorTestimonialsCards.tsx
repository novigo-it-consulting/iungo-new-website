import TestimonialCard from "@/components/ui/TestimonialCard";

import { BEHAVIOR_TESTIMONIALS } from "./behaviorTestimonials.constants";

export default function BehaviorTestimonialsCards() {
  return (
    <ul
      data-behavior-testimonials-cards
      className="mt-10 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {BEHAVIOR_TESTIMONIALS.map((testimonial) => (
        <li key={testimonial.id} className="min-w-0">
          <TestimonialCard
            variant="behavior"
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
