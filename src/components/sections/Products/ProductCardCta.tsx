import Link from "next/link";

interface ProductCardCtaProps {
  productId: string;
  href: string;
  label?: string;
}

export default function ProductCardCta({
  productId,
  href,
  label = "Saiba mais",
}: ProductCardCtaProps) {
  return (
    <Link
      data-product-cta={productId}
      href={href}
      className="inline-flex h-[54px] w-[161px] shrink-0 items-center justify-center rounded-[57.27px] bg-[#0024AE] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
    >
      <span
        data-product-cta-label={productId}
        className="inline-flex h-[28px] w-[93px] items-center justify-center whitespace-nowrap"
      >
        {label}
      </span>
    </Link>
  );
}
