export const requestDemoSectionClassName =
  "w-full min-w-0 bg-[linear-gradient(180deg,#FFFFFF_29%,#E9F3FF_100%)] pt-12 pb-[79px] md:pt-14 xl:pt-[66px]";

// Passa ao PageContainer size="content1264" somente a estrutura de coluna flexível.
// max-width, centralização e gutters laterais são de responsabilidade do PageContainer.
export const requestDemoPageFrameClassName =
  "flex min-w-0 w-full flex-col";

export const requestDemoTitleClassName =
  "request-demo-title m-0 w-full max-w-[561.03px] font-reddit font-semibold tracking-[-0.01em] text-[#424241] text-[40px] leading-[48px] sm:text-[44px] sm:leading-[58px] md:text-[48px] md:leading-[64px]";

// Container interno: ocupa toda a largura do content1264 (sem max-w próprio).
export const requestDemoMainContainerClassName =
  "w-full min-w-0";

// Layout de colunas: grid proporcional 67.82:32.18 (mesmas proporções do Figma:
// form 811.76px / contacts 385.24px / gap 52px = 1249px em 1264px).
// minmax(0,...) permite que as colunas encolham abaixo do conteúdo implícito (auto),
// evitando overflow quando os campos do formulário forem mais largos que a coluna.
// As colunas preenchem 100 % do container — borda direita alinhada ao Header.
export const requestDemoMainLayoutClassName =
  "grid w-full min-w-0 grid-cols-1 gap-y-[52px] min-[1249px]:grid-cols-[minmax(0,67.82fr)_minmax(0,32.18fr)] min-[1249px]:gap-x-[52px] min-[1249px]:gap-y-0 min-[1249px]:items-start";

export const requestDemoFormColumnClassName =
  "w-full min-w-0";
