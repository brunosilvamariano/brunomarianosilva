# Bruno Mariano — Portfólio

Página única em português, feita com HTML, CSS, JavaScript e ferramentas locais em Node.js. Sem dependências de execução e sem publicação automática.

## Rodar

Requer Node.js 20 ou superior. Não precisa executar `npm install`.

```powershell
npm run dev
```

Abra `http://localhost:3000`. Se a porta já estiver ocupada, reutilize o servidor existente ou execute `npm run dev -- --port 3001`.

```powershell
npm run build
npm run preview
```

O build verifica as referências locais e prepara `dist/`. O preview serve essa pasta. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Arquivos

| Caminho | Função |
|---|---|
| `index.html` | Conteúdo, preços, links, cards de serviços e estrutura semântica |
| `css/portfolio.css` | Inter Display local, composição, componentes, animações e responsividade |
| `js/portfolio.js` | Menu, contadores, portfólio contínuo, interação por ponteiro e preferências de movimento |
| `img/portfolio/bruno-color.webp` | Retrato colorido com melhoria de nitidez e iluminação via ImageGen |
| `img/portfolio/bruno.webp` | Versão original otimizada, preservada |
| `img/portfolio/*.webp` | Captura real da Fritz em WebP e miniaturas antigas preservadas, sem uso no HTML |
| `img/portfolio/brand.svg` | Marca vetorial b com estrela |
| `img/portfolio/favicon.svg` | Favicon SVG e respectivas versões PNG |
| `fonts/` | Inter Display Light, Regular, Medium, SemiBold e licença OFL |
| `scripts/serve.mjs` | Servidor HTTP local Node |
| `scripts/build.mjs` | Build estático e verificação de arquivos |
| `docs/pesquisa-de-precos.md` | Referências de mercado e escopos dos preços |
| `docs/tratamento-da-foto.md` | Origem da foto, método e prompt da edição |

Os recursos legados em `css`, `js` e `img` permanecem preservados. O HTML novo usa somente as fontes e os recursos de portfólio. Exclusões já existentes no Git não foram revertidas.

## Design e interações

A home do Finox orienta a família tipográfica, as cores, as proporções, os contadores e o movimento contínuo dos projetos. O conteúdo, a fotografia e a marca foram adaptados ao Bruno.

- Entrada do título com letras em máscara e contadores com rolos de dígitos.
- Retrato colorido com deslocamento sutil durante a rolagem no desktop.
- Revelação progressiva de seções e cards.
- Portfólio horizontal em ciclo contínuo, com pausa ao passar o ponteiro, focar, arrastar ou usar os controles.
- Botões de navegação, rolagem por toque e teclas de seta.
- Cursor circular que acompanha o ponteiro nas imagens dos projetos.
- Cards de serviços com preços e escopos sempre visíveis, iluminação e inclinação discretas.
- Rodapé preto com margens laterais, cantos arredondados e assinatura tipográfica em degradê, seguindo o Finox. Copyright centralizado sobre a faixa, com pausa ao interagir.
- Controle global de pausa e respeito à preferência de movimento reduzido do sistema.

O conteúdo fica visível e os links continuam funcionando sem JavaScript. Clones do portfólio são ocultos para leitores de tela e não entram na sequência do teclado.

## Preços e escopo

- Landing page: **4 × R$ 300**, total R$ 1.200; uma página com até sete seções e duas rodadas de ajustes.
- Site institucional: **5 × R$ 400**, total R$ 2.000; até cinco páginas e duas rodadas de ajustes.
- Sistemas e apps: orçamento após definição de requisitos.
- Consultoria de anúncios: **R$ 500**, sessão de até 90 minutos.
- Manutenção: **R$ 200/mês**, até uma hora de ajustes mensais.

Domínio, hospedagem e mídia são separados. Não são anunciados juros, taxas, descontos ou meios de pagamento não definidos. Os preços e limites estão no HTML e podem ser editados diretamente. A pesquisa de mercado está em `docs/`.

## Contatos

WhatsApp `5547991597258`, Instagram `brunomarianoweb`, GitHub `brunosilvamariano` e LinkedIn informado pelo usuário. Cada card abre uma mensagem de interesse específica no WhatsApp, sem enviar nada automaticamente.

## Imagens

A Fritz é o único trabalho publicado no portfólio. A miniatura é uma captura real de higienizacaofritz.com.br, convertida para WebP. Os seis espaços seguintes mostram Em breve e não têm links para os trabalhos anteriores. O contador da abertura mostra um projeto publicado. A foto fornecida foi tratada em cores com o ImageGen, mantendo a identidade como restrição do prompt. O arquivo original foi preservado. Todos os recursos necessários para renderizar a página estão no projeto.

## Verificação

Build e sintaxe JavaScript verificados. Layout conferido em desktop e celular. O servidor responde somente com arquivos públicos da página e bloqueia o acesso a `.git`, scripts e configurações.

## Foto da seção Sobre

A imagem `img/about.png` foi usada para um novo tratamento: remoção do círculo e do fundo, correção da luz e redução da dominante amarela. O recorte com transparência está em `img/portfolio/bruno-about.webp` e é usado nas duas imagens da seção Sobre. O hero continua com `bruno-color.webp`. O original `img/about.png` foi preservado. Método e prompt estão em `docs/tratamento-foto-sobre.md`.
