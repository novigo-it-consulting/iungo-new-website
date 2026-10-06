This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Textos traduzidos

Os textos visíveis ficam em `src/messages/{pt-BR,en,es}/`. O pt-BR é a fonte da tipagem. A lista de namespaces está em `src/i18n/namespaces.ts` e a montagem em `src/i18n/loadMessages.ts`.

Para adicionar um texto: copie a frase atual para o JSON do pt-BR, traduza a mesma chave em en e es, e leia com `getTranslations` no servidor ou `useTranslations` no cliente. Texto repetido entra em `common.json`. O glossário está em `docs/i18n/glossary.md`.

A paridade das chaves, dos placeholders e das tags de rich text roda com `npm test`.

