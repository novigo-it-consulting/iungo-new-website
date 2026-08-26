export default function ProductsSection() {
  return (
    <section
      data-products-section
      className="w-full bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center px-4 pt-12 md:px-8 2xl:px-0 2xl:pt-[35px]">
        <h2
          data-products-heading
          className="flex w-full max-w-[1672px] items-center justify-center text-center font-reddit text-[28px] font-semibold leading-[40px] tracking-[-0.28px] text-[#424241] md:text-[32px] md:leading-[48px] md:tracking-[-0.32px] 2xl:h-[78px] 2xl:text-[40px] 2xl:leading-[96px] 2xl:tracking-[-0.4px]"
        >
          7 produtos. Um único cérebro.
        </h2>

        <p
          data-products-description
          className="flex w-full max-w-[991px] items-center justify-center text-center font-reddit text-[16px] font-normal leading-[28px] tracking-[0px] text-[#909090] md:text-[18px] md:leading-[32px] 2xl:h-[40px] 2xl:text-[20px] 2xl:leading-[40px]"
        >
          Nativamente integrados sobre 3 engines proprietárias de IA. Compre
          por módulo ou em pacotes Go-to-Market.
        </p>
      </div>
    </section>
  );
}
