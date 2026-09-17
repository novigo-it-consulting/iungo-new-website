# FormSubmit — Configuração e Ativação

O formulário "Vamos conversar" usa o FormSubmit via AJAX (`fetch`). Não há variáveis de ambiente nem chaves públicas para configurar: o destinatário (`comercial@iungo-ai.com`) está fixo em `src/lib/formsubmit.ts`.

## Ativação da caixa de destino (obrigatório antes de receber leads)

O FormSubmit exige que o destinatário confirme o endereço na primeira tentativa de envio.

1. Rode o servidor local com `npm run dev`.
2. Preencha e envie o formulário **a partir do servidor HTTP** (`http://localhost:3000/solicitar-demonstracao`).
   - `file://` não funciona — o FormSubmit verifica a origem HTTP.
3. A caixa `comercial@iungo-ai.com` recebe um e-mail de **confirmação do FormSubmit**.
4. Clique no link de confirmação nesse e-mail.
5. Repita o envio: desta vez o lead deve chegar na caixa (verifique também o spam).

### Opcional pós-ativação: invisible email

Após a confirmação, o FormSubmit envia um **hash** chamado "invisible email" (ex.: `abc123...`). Ele pode ser usado no endpoint no lugar do e-mail:

```
POST https://formsubmit.co/ajax/<hash>
```

Isso evita expor o endereço de destino na source do site. Para usá-lo, altere `FORMSUBMIT_ENDPOINT` em `src/lib/formsubmit.ts`. O hash não é um segredo — é apenas um identificador e não substitui proteção contra abuso.

## Ativação em produção

Repita o processo acima a partir do **domínio de produção** (não apenas de localhost). O FormSubmit pode exigir confirmação por origem.

## Proteções disponíveis

### Honeypot (`_honey`)

Campo invisível presente no formulário (`name="_honey"`). Se um bot preencher este campo, o FormSubmit descarta o envio em silêncio. O campo tem `aria-hidden`, `tabIndex={-1}` e `autoComplete="off"` para não interferir com usuários reais.

**Limitação:** não equivale a CAPTCHA. Bots sofisticados que ignorem campos ocultos não são bloqueados.

### CAPTCHA no fluxo AJAX

A documentação oficial do FormSubmit descreve o reCAPTCHA somente para formulários HTML tradicionais (com `action`). Os exemplos do endpoint `/ajax` (fetch e jQuery) **não** descrevem widget de CAPTCHA nem token de verificação. Sem um teste controlado contra o endpoint, não é possível afirmar se o CAPTCHA está ativo ou não neste fluxo.

Por isso:
- Este formulário **não** envia `_captcha: false` (para não desativar proteção que possa existir por suposição).
- Este formulário **não** implementa widget de CAPTCHA (que seria ignorado pelo endpoint AJAX).
- A documentação não afirma que CAPTCHA esteja ativo neste fluxo.

## Template de e-mail

O payload usa `_template: "table"`, que gera um e-mail formatado automaticamente pelo FormSubmit com os campos visíveis como tabela. Não é necessário HTML próprio.

Campos enviados e como aparecem no e-mail:

| Chave no payload        | Aparece na tabela como     |
|-------------------------|----------------------------|
| `TIPO DE CONTATO`       | TIPO DE CONTATO            |
| `NOME`                  | NOME                       |
| `EMAIL CORPORATIVO`     | EMAIL CORPORATIVO          |
| `EMPRESA`               | EMPRESA                    |
| `TELEFONE / WHATSAPP`   | TELEFONE / WHATSAPP        |
| `PRODUTO DE INTERESSE`  | PRODUTO DE INTERESSE       |
| `MENSAGEM`              | MENSAGEM                   |
| `_replyto`              | Reply-To do e-mail (cabeçalho) — não aparece como linha de conteúdo |
| `_subject`              | Assunto do e-mail          |
| `_honey`                | Não aparece (campo especial) |

O campo `email` do visitante aparece **uma única vez** como `EMAIL CORPORATIVO`. Não há linha duplicada porque `_replyto` é tratado como cabeçalho Reply-To, não como campo de conteúdo.

## Timeout

O módulo usa `AbortController` com 15 segundos. Se o servidor demorar mais que isso, o formulário exibe a mensagem de resultado incerto ("Não foi possível confirmar o envio. Aguarde um momento antes de tentar novamente.") e libera o botão. Os dados são preservados. O servidor pode ter processado a requisição antes da interrupção, por isso a mensagem não afirma que o envio falhou.

## Verificação manual

1. Ative a caixa conforme descrito acima.
2. Preencha o formulário com dados reais e envie.
3. Confira o e-mail em `comercial@iungo-ai.com` (incluindo spam).
4. Responda ao e-mail: o Reply-To deve apontar para o endereço do visitante.

### Testando o estado de resultado incerto (offline)

Para simular perda de conexão e verificar a mensagem "Não foi possível confirmar o envio":

1. Abra `http://localhost:3000/solicitar-demonstracao` no navegador.
2. Preencha o formulário.
3. Abra o DevTools → aba **Network** → selecione **Offline** no menu de throttling.
4. Clique em "Enviar mensagem": o formulário deve exibir a mensagem de resultado incerto e preservar os dados.
5. Restaure a conexão em Network → **No throttling**.

> **Por que não basta parar o servidor Next.js?**
> O formulário envia diretamente para `https://formsubmit.co/ajax/…` — um servidor externo.
> O servidor Next.js serve apenas os assets e a página inicial; a requisição AJAX não passa por ele.
> Parar o Next.js impede carregar a página, mas não simula perda de rede durante o envio.

## Logs e depuração

Erros de rede e respostas inesperadas são capturados em `sendRequestDemoEmail` e retornados como mensagem amigável ao usuário. Dados pessoais não são registrados em log.
