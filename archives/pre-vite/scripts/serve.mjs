import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = process.argv.includes('--dist') ? path.join(project, 'dist') : project;
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 3000);
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8' };

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const requested = decodeURIComponent(url.pathname);
    const file = path.resolve(root, '.' + (requested === '/' ? '/index.html' : requested));
    const relative = path.relative(root, file);
    // O servidor é restrito ao site: não expõe Git, scripts, configurações ou outros diretórios.
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(s => s.startsWith('.')) || !/^(index\.html|robots\.txt|(?:css|js|img|fonts)[\\/])/.test(relative)) {
      res.writeHead(403); return res.end('Acesso negado');
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not found');
    res.writeHead(200, { 'Content-Type':mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    if (req.method === 'HEAD') return res.end();
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Página não encontrada');
  }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));
