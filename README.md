# Bruno Mariano — Portfólio

Portfólio em TypeScript + Vite, adaptado da composição do [DarkCV da HTML Codex](https://htmlcodex.com/demo/?item=2122), com tema claro, perfil fixo à esquerda no desktop e conteúdo responsivo. A implementação usa os arquivos e recursos do projeto existente.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

```powershell
npm ci
npm run dev
npm run build
```

O build estático fica em `dist/`. `npm run typecheck` verifica os tipos. Os comandos não publicam o site.

## Conteúdo e manutenção

- `index.html`: página inicial com serviços, valores e portfólio.
- `src/main.ts`: filtros dos projetos e ano do rodapé.
- `src/styles/main.css`: tema claro e regras responsivas.
- `public/images/projects/`: imagens dos seis projetos, incluindo capturas locais já fornecidas nos Downloads.

Projetos: FAP Contabilidade, Novo Sites, ZenatoCell, BizPeek, Fritz Higienização e Avele Estética Facial. Todos abrem os endereços fornecidos em nova aba.

Valores atualizados em 20/11/2026: landing page R$ 1.500 (4 × R$ 375); site institucional R$ 2.500 (5 × R$ 500); consultoria R$ 600 por sessão de até 90 minutos; manutenção R$ 250/mês. Sistemas seguem com orçamento personalizado. Os valores foram reajustados a pedido do titular e não representam pesquisa atual de mercado.

O contato ocorre pelos links de WhatsApp e e-mail e pelo CTA flutuante. A página inicial contém somente serviços, valores e portfólio. Os módulos e estilos anteriores em `src/features`, `src/effects` e `src/styles/sections` não são carregados pela página.

Verificação: build TypeScript/Vite, carregamento de imagens, filtro de sistemas, seis projetos e ausência de transbordamento horizontal em desktop e viewport de 390px. Captura do desktop em `docs/portfolio-desktop.jpg`.

A página inclui um CTA flutuante de WhatsApp em azul cobalto. O build gera somente a entrada `index.html`.
