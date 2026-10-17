import { cp, mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
// Copiamos somente os arquivos usados na nova página. Os originais ficam preservados.
const files = ['index.html', 'css/portfolio.css', 'js/portfolio.js', 'img/portfolio', 'fonts'];
await mkdir(out, { recursive: true });
for (const file of files) await cp(path.join(root, file), path.join(out, file), { recursive: true });

// Verificação de referências locais para evitar entregar CSS, fontes ou imagens ausentes.
for (const file of ['index.html', 'css/portfolio.css']) {
  const source = await readFile(path.join(root, file), 'utf8');
  const refs = file.endsWith('.html')
    ? [...source.matchAll(/(?:src|href)="([^"#?]+)"/g)].map(m => m[1])
    : [...source.matchAll(/url\(['"]?([^)'"?]+)['"]?\)/g)].map(m => m[1]);
  for (const ref of refs.filter(r => !/^(?:https?:|mailto:|tel:|data:)/.test(r))) {
    await stat(path.resolve(root, path.dirname(file), ref));
  }
}
await writeFile(path.join(out, 'robots.txt'), 'User-agent: *\nAllow: /\n');
console.log('Build concluído: dist/ — arquivos locais e referências verificados.');
