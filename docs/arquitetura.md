# Arquitetura e convenções

## Escolhas

TypeScript organiza as interações e o Vite compila os módulos e o CSS. O HTML guarda o conteúdo da página, que não depende de JavaScript para aparecer. Não há necessidade de framework, roteador ou backend para o escopo atual.

`src/main.ts` é o ponto de composição: importa os estilos, cria o estado de movimento e inicializa as funcionalidades. As funcionalidades ficam em `features/`, os efeitos visuais em `effects/` e os recursos compartilhados em `shared/`.

Os nomes de arquivos usam palavras em inglês, minúsculas e hífens quando necessário. Classes CSS descrevem componentes e estados. Comentários explicam decisões, restrições e comportamento que não é óbvio pelo código.

## Estilos

`styles/main.css` declara a ordem da cascata: base, seções e estados globais. Cada arquivo de seção reúne layout, detalhes visuais, interações e regras responsivas daquela seção. Fontes, variáveis e utilitários ficam na base. A preferência de movimento reduzido permanece disponível em CSS e TypeScript.

## Semântica e acessibilidade

- Um `header`, um `main` e um `footer` organizam os pontos principais da página.
- As navegações têm rótulos distintos; o link de salto aponta para o conteúdo principal focalizável.
- Há um `h1` com nome acessível que identifica Bruno e sua atividade; seções usam `h2` e cards usam `h3`.
- Trabalhos e serviços usam `article`; entregáveis são listas; os contatos diretos usam `address`.
- Links navegam e botões executam ações. O menu informa seu estado e aceita Escape e Tab.
- Imagens informativas têm texto alternativo; ícones, letras animadas e cópias decorativas são ocultos de leitores de tela.
- O carrossel tem nome, botões, navegação por setas e pausa. O contador automático não usa região viva para evitar anúncios constantes.

## Recursos e histórico

Somente arquivos ativos ficam em `public/`. Fotografias originais ficam em `assets/originals/`. Implementações e materiais anteriores ficam em `archives/`, fora do bundle. Não use essas pastas como origem de recursos da página.

`archives/refactor/` preserva o CSS e os módulos de antes desta organização. `archives/pre-vite/` guarda a versão anterior ao Vite. `archives/previous-materials/` contém imagens e marcas antigas.
