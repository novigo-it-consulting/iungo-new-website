export type ProductSystemScreenBadgeItem = {
  id: string;
  label: string;
  isActive: boolean;
};

export type ProductSystemScreenImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductSystemScreenMainImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductSystemScreensHeaderClassNames = {
  container?: string;
  title?: string;
  description?: string;
};

export type ProductSystemScreensContent = {
  title: string;
  description: string;
  ariaLabel: string;
  inactiveBorderClassName?: string;
  headerClassNames?: ProductSystemScreensHeaderClassNames;
  badges: readonly ProductSystemScreenBadgeItem[];
  main: ProductSystemScreenMainImage;
  gridItems: readonly ProductSystemScreenImage[];
};
