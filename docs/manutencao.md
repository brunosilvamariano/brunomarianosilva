# Guia de manutenção

## Textos, projetos e valores

Edite o conteúdo em `index.html`. Preserve os IDs de seções e os atributos usados pelas interações: `data-counter`, `data-slide`, `aria-controls` e os identificadores de títulos.

Para publicar um novo trabalho, substitua um card “Em breve” por um `article.project` com título, descrição, link e captura real. O módulo do carrossel calcula a quantidade automaticamente; atualize também o contador inicial no HTML, os destaques do hero e os textos que mencionam a quantidade de trabalhos publicados.

Preços e escopos ficam nos cards de serviços. Ao mudar parcelas, atualize o investimento total e a descrição do escopo. Os CTAs podem conter uma mensagem codificada na URL do WhatsApp; mantenha essa mensagem coerente com o serviço.

## Imagens e marca

- Hero: `public/images/portraits/bruno-hero.webp`.
- Sobre: `public/images/portraits/bruno-about.webp`, com transparência.
- Fritz: `public/images/projects/fritz.webp`.
- Marca e favicons: `public/icons/`.
- Fotografias originais: `assets/originals/portraits/`.

Use WebP para fotografias, SVG para a marca e PNG nos favicons compatíveis. Ao trocar uma imagem, atualize texto alternativo, dimensões e o preload quando aplicável. O retrato do hero tem prioridade de carregamento; imagens das seções seguintes usam carregamento adiado.

## Aparência e interações

Edite o CSS da seção em `src/styles/sections/`. Fontes, cores e tokens compartilhados ficam em `base.css`. Edite a navegação, a apresentação ou o carrossel em `src/features/`; efeitos visuais ficam em `src/effects/`. A pausa e a preferência de movimento reduzido são compartilhadas por `src/shared/motion.ts`.

## Antes de entregar

```powershell
npm run format
npm run format:check
npm run build
npm run preview
```

Confira desktop e celular, menu por teclado, navegação entre seções, carrossel, pausa, contatos e carregamento das imagens. Não edite arquivos gerados em `dist/` e não copie `node_modules/` para hospedagem.

## Imagens atualizadas

O hero usa a foto de camisa branca enviada em hero.webp, com tratamento do recorte e fundo transparente. O original foi preservado em assets/originals/portraits/hero-white-shirt.webp; a versão anterior está em archives/refactor/hero-before-white-shirt.webp. A ilustração do Sobre fica em public/images/illustrations/digital-solutions.webp e representa sites responsivos e sistemas. O retrato central do Sobre foi mantido.
