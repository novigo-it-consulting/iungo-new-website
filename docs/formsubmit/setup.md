# FormSubmit — Configuração e Ativação

O formulário "Vamos conversar" envia via AJAX **do navegador** para:

```
POST https://formsubmit.co/ajax/comercial@iungo-ai.com
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Accept: application/json
```

JSON (`Content-Type: application/json`) obriga um preflight CORS (`OPTIONS`). No Chrome esse `OPTIONS` para `formsubmit.co` fica pendente e o fetch é cancelado aos 15s — o `POST` do lead não conclui. `application/x-www-form-urlencoded` é pedido simples: o `POST` sai sem `OPTIONS`. O `Accept: application/json` pede a resposta JSON. Origin e Referer são os que o navegador envia. O FormSubmit identifica o formulário já ativado por essa origem; um POST feito pelo servidor Next.js (com Origin/Referer inventados) é outro pedido e quebra o reconhecimento.

Não há variáveis `NEXT_PUBLIC_*`. O destinatário fica em `src/lib/formsubmit.ts`.

A interface do visitante **não** mostra instruções de ativação. As falhas usam mensagens distintas:

- rejeição explícita do FormSubmit (success false sem ativação, ou HTTP 4xx);
- timeout (AbortError aos 15s);
- ativação só quando a mensagem do serviço cita Activate Form — o texto ao visitante não pede que ative o formulário;
- resultado incerto (rede, HTTP 5xx, JSON inválido).

Em todos esses casos a UI oferece contato por `comercial@iungo-ai.com` e preserva os campos preenchidos.

## Ativação da caixa de destino (procedimento interno)

O FormSubmit exige confirmação do destinatário na primeira origem (localhost e produção são origens diferentes).

1. Envie o formulário a partir de um servidor HTTP (`http://localhost:3000/solicitar-demonstracao` ou o domínio publicado). `file://` não funciona.
2. A caixa `comercial@iungo-ai.com` recebe o e-mail de confirmação do FormSubmit.
3. Clique no link de ativação.
4. O próximo envio pela **mesma origem** deve chegar como lead (confira também o spam).

Respostas observadas do `/ajax` (HTTP 200, corpo JSON):

```json
{"success":"true"}
```

```json
{"success":"false","message":"This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!"}
```

`success: "false"` é recusa explícita, não sucesso. Se a mensagem citar Activate Form, a UI usa o texto de ativação (sem pedir que a pessoa clique no e-mail de confirmação). Outras recusas usam o texto de rejeição. Timeout usa um terceiro texto. Rede/5xx/JSON inválido usam o texto de envio não confirmado.

### Opcional pós-ativação: invisible email

Após a confirmação, o FormSubmit envia um hash ("invisible email"). Ele pode substituir o e-mail no endpoint:

```
POST https://formsubmit.co/ajax/<hash>
```

Altere `FORMSUBMIT_ENDPOINT` em `src/lib/formsubmit.ts`. O hash não é um segredo e não substitui proteção contra abuso.

## Proteções disponíveis

### Honeypot (`_honey`)

Campo invisível (`name="_honey"`), depois dos campos reais para o gerenciador de senhas do desktop não preenchê-lo como se fosse o primeiro input. Se um bot preencher, o FormSubmit descarta o envio. Não equivale a CAPTCHA. Não remova este campo para contornar falha de envio.

### CAPTCHA no fluxo AJAX

A documentação descreve o reCAPTCHA só para formulários HTML com `action`. Os exemplos `/ajax` não descrevem widget nem token. Este formulário **não** envia `_captcha: false`.

## Template de e-mail

O payload usa `_template: "table"`.

| Chave no payload        | Aparece na tabela como     |
|-------------------------|----------------------------|
| `TIPO DE CONTATO`       | TIPO DE CONTATO            |
| `NOME`                  | NOME                       |
| `EMAIL CORPORATIVO`     | EMAIL CORPORATIVO          |
| `EMPRESA`               | EMPRESA                    |
| `TELEFONE / WHATSAPP`   | TELEFONE / WHATSAPP        |
| `PRODUTO DE INTERESSE`  | PRODUTO DE INTERESSE       |
| `MENSAGEM`              | MENSAGEM                   |
| `_replyto`              | Reply-To (cabeçalho)       |
| `_subject`              | Assunto                    |
| `_honey`                | Não aparece                |

## Timeout

`AbortController` de 15 segundos. Se estourar, a UI mostra a mensagem de timeout (distinta da rejeição e da ativação) e preserva os campos. Não há reenvio automático. O serviço pode ter processado antes do abort.

No Network do Chrome, o envio correto mostra **um** `POST` para `formsubmit.co/ajax/...`, sem linha `Preflight` pendente. Se ainda aparecer `Preflight` + fetch `(canceled)` em 15.00 s, o `Content-Type` voltou a ser JSON.

## Verificação manual (um envio identificado)

1. Preencha o formulário com dados claramente de teste (ex.: nome `TESTE IUNGO — ignorar`).
2. Envie **uma** vez a partir do domínio já ativado.
3. Confira `comercial@iungo-ai.com` (entrada e spam).
4. Aceitação pelo FormSubmit (`success: true`) não é a mesma coisa que o e-mail visível na caixa.

### Testando resultado incerto (offline)

1. Abra a página pelo servidor HTTP.
2. Preencha o formulário.
3. DevTools → Network → Offline.
4. Envie: a mensagem de não confirmação deve aparecer e os dados permanecem.
5. Restaure a conexão.

O POST vai para `formsubmit.co`, não para o Next.js. Parar `npm run dev` não simula perda de rede nesse envio.

## Logs

A classificação usa só status, categoria (`activation` / `rejection` / `uncertain`) e a mensagem ao visitante. Dados pessoais não são registrados.
