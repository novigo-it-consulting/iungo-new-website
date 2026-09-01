import ResolveTestimonialsCards from "./ResolveTestimonialsCards";
import ResolveTestimonialsDisclaimer from "./ResolveTestimonialsDisclaimer";
import ResolveTestimonialsHeader from "./ResolveTestimonialsHeader";

export default function ResolveTestimonials() {
  return (
    <div
      data-resolve-testimonials
      aria-labelledby="resolve-testimonials-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ResolveTestimonialsHeader />

      <ResolveTestimonialsCards />

      <ResolveTestimonialsDisclaimer />
    </div>
  );
}
