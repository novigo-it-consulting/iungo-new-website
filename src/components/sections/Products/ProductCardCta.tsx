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
      className="inline-flex h-[40.88px] w-[121.9px] shrink-0 items-center justify-center gap-[8.67px] self-start whitespace-nowrap rounded-[43.36px] border-0 bg-[#0024AE] px-[13.88px] py-[6.94px] shadow-none transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
    >
      <span
        data-product-cta-label={productId}
        className="h-auto w-fit whitespace-nowrap font-reddit text-[13.63px] font-bold leading-[20.8px] tracking-[0] text-white"
      >
        {label}
      </span>
    </Link>
  );
}
