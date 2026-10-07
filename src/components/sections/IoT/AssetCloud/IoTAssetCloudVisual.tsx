import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function IoTAssetCloudVisual() {
  const t = await getTranslations("productPages.iot.assetCloud");

  return (
    <div
      data-iot-asset-cloud-visual
      className="flex w-full min-w-0 justify-center py-[76px] xl:w-[601px] xl:shrink-0"
    >
      <Image
        src="/images/products/iot/asset-cloud-dashboard.svg"
        alt={t("imageAlt")}
        width={601}
        height={319}
        unoptimized
        sizes="(min-width: 1280px) 601px, calc(100vw - 48px)"
        className="h-auto w-full max-w-[601px] xl:h-[319px]"
      />
    </div>
  );
}
