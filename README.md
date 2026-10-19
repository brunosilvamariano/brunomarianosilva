# Bruno Mariano — Portfólio

Portfólio de página única em **TypeScript + Vite**, com fontes locais, imagens WebP e navegação responsiva. O conteúdo principal permanece no HTML e funciona sem depender de renderização por JavaScript.

## Começar

Requer Node.js **20.19+ na linha 20 ou 22.12+** e npm.

```powershell
npm ci
npm run dev
```

Abra http://localhost:5173. Mantenha o terminal aberto. Para encerrar, pressione Ctrl + C. Se a porta já estiver ocupada por outra execução, use o servidor existente ou escolha outra porta:

```powershell
npm run dev -- --port 5174
```

## Comandos

| Comando                | Finalidade                                 |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Desenvolvimento com atualização automática |
| `npm run typecheck`    | Verificar os tipos sem gerar arquivos      |
| `npm run format`       | Formatar os arquivos ativos com Prettier   |
| `npm run format:check` | Conferir a formatação                      |
| `npm run build`        | Verificar os tipos e gerar `dist/`         |
| `npm run preview`      | Conferir o build em http://localhost:4173  |

O build gera um site estático. Nenhum desses comandos publica o projeto. `dist/` e `node_modules/` são gerados e não devem ser editados.

## Estrutura

```text
index.html                       Conteúdo, metadados e estrutura semântica
src/
  main.ts                        Inicialização da aplicação
  features/
    navigation.ts                Menu e navegação por teclado
    hero.ts                      Letras e contadores da apresentação
    portfolio.ts                 Carrossel, botões, arraste e pausa
  effects/
    reveal.ts                    Entrada das seções na tela
    scroll.ts                    Progresso e resposta à rolagem
    pointer.ts                   Resposta ao ponteiro e inclinação
  shared/
    dom.ts                       Seletores tipados
    motion.ts                    Preferências e controle de movimento
  styles/
    main.css                     Ordem de importação dos estilos
    base.css                     Fontes, tokens, normalização e utilitários
    motion.css                   Estados globais de movimento e revelação
    sections/
      header.css                 Cabeçalho e menu
      hero.css                   Apresentação e retrato
      about.css                  Sobre mim
      portfolio.css              Projetos e carrossel
      services.css               Serviços, escopos e preços
      footer.css                 Contatos e assinatura
public/
  fonts/                         Fontes Inter Display e licença
  icons/                         Marca e ícone Apple
  images/
    portraits/                   Retratos otimizados usados no site
    projects/                    Capturas de projetos publicados
  favicon.svg                    Favicon vetorial
  favicon.ico                    Fallback de favicon 16, 32 e 48 px
  robots.txt
assets/originals/portraits/       Fotografias originais para futuras edições
docs/                            Arquitetura, manutenção e decisões
.editorconfig                    Padrão básico para editores
.prettierrc.json                  Formatação de código
vite.config.ts                   Desenvolvimento e build
tsconfig.json                    TypeScript estrito
package.json                     Scripts e dependências
package-lock.json                Versões reproduzíveis
```

Os estilos de cada seção incluem seus breakpoints e estados de interação. Os recursos em `public/` mantêm suas URLs no build. As fotos originais ficam fora da publicação. As cópias da implementação anterior foram retiradas do projeto.

## Manutenção

Consulte [o guia de manutenção](docs/manutencao.md) para editar textos, imagens, preços e interações. [A arquitetura](docs/arquitetura.md) explica a divisão de responsabilidades e a semântica.

Os projetos publicados no portfólio são [Fritz Higienização](https://higienizacaofritz.com.br/) e [BizPeek](https://leedsnew.vercel.app/login), plataforma de prospecção e gestão comercial. Os cinco espaços restantes exibem “Em breve”. A captura do BizPeek mostra somente a tela pública de entrada, sem dados de usuários. Os valores e escopos estão no HTML; a pesquisa que orientou a precificação está em [docs/pesquisa-de-precos.md](docs/pesquisa-de-precos.md).

Os contatos são WhatsApp `5547991597258`, Instagram `brunomarianoweb`, GitHub `brunosilvamariano` e LinkedIn de Bruno Mariano. Os links de WhatsApp apenas abrem a conversa.

## SEO e posicionamento

O conteúdo destaca soluções para empresas em Joinville, com atendimento remoto no Brasil e exterior. Consulte [a estratégia de SEO](docs/estrategia-seo.md) para intenções de busca, prioridades de conteúdo, medição e próximos passos. Canonical e sitemap estão preparados para `https://brunomarianosilva.com.br/`; a publicação e as configurações de hospedagem permanecem separadas do desenvolvimento local.
