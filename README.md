# Chefe da Banca — link na bio

Site estático (HTML + CSS + JS puro). Não precisa instalar nada nem rodar build.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `config.js` | **O único arquivo que você precisa editar**: nome, descrição, links, avisos do rodapé |
| `index.html` | Estrutura da página, SEO e espaço para o analytics |
| `style.css` | Visual |
| `script.js` | Monta a página a partir do config, rastreamento, UTM, faíscas |
| `assets/` | Foto otimizada (512×512), imagem de compartilhamento e favicons |

## Editar links e textos

Abra `config.js` em qualquer editor (até o Bloco de Notas) e troque o que está entre aspas:

```js
links: [
  { label: "🎲 Jogos do Chefe",    url: "https://t.me/...", track: "jogos" },
  { label: "⚽ Palpites do Chefe", url: "https://t.me/...", track: "palpites" }
],
```

- Para **adicionar um botão**, copie uma linha `{ ... },` e mude o texto e o link.
- Os avisos do rodapé ficam em `notices`.
- Mantenha as aspas e as vírgulas, senão a página volta a mostrar os textos padrão do `index.html`.

Para testar, basta abrir o `index.html` no navegador.

> Se trocar a foto, gere uma nova `assets/perfil-512.jpg` quadrada (e, se quiser, os favicons).

## Medir os cliques

1. Cole o script do Plausible, Google Analytics 4 ou Meta Pixel no espaço comentado `ANALYTICS` dentro do `<head>` do `index.html`.
2. Pronto: cada clique já envia um evento com o nome do botão (`jogos` ou `palpites`):
   - Plausible: evento `Clique` (crie um "Custom event goal" com esse nome)
   - GA4: evento `clique_botao`
   - Meta Pixel: evento personalizado `CliqueBotao`
3. Links com `?utm_source=instagram&utm_medium=bio` têm os `utm_*` repassados para os botões automaticamente.

## Publicar de graça

### Opção 1 — Netlify (mais fácil, sem conta no GitHub)
1. Acesse https://app.netlify.com/drop e crie uma conta grátis.
2. Arraste a pasta do projeto para a página.
3. Em *Site configuration → Change site name*, escolha o endereço (ex.: `chefedabanca.netlify.app`).
4. Para atualizar, vá em *Deploys* e arraste a pasta de novo.

### Opção 2 — Vercel
1. Crie uma conta em https://vercel.com.
2. Suba os arquivos para um repositório no GitHub (veja a opção 3, passos 1–2).
3. Na Vercel: *Add New → Project*, escolha o repositório e clique em *Deploy* (não precisa mudar nenhuma configuração).
4. Cada alteração enviada ao GitHub publica sozinha.

### Opção 3 — GitHub Pages
1. Crie uma conta em https://github.com e um repositório público novo (ex.: `chefe-da-banca`).
2. Clique em *Add file → Upload files* e envie `index.html`, `style.css`, `script.js`, `config.js` e a pasta `assets`.
3. Vá em *Settings → Pages*, em *Source* escolha *Deploy from a branch*, branch `main`, pasta `/ (root)` e salve.
4. Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/chefe-da-banca/`.

### Depois de publicar
- No `index.html`, troque `assets/og-image.jpg` (nas tags `og:image` e `twitter:image`) pela URL completa, ex.: `https://chefedabanca.netlify.app/assets/og-image.jpg`. Assim a prévia com a foto aparece no WhatsApp e no Instagram.
- Publique **só os arquivos do site** (lista acima) — não envie outras imagens que estejam na pasta.
