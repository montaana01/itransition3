import { createServer } from 'node:http';
import { URL } from 'node:url';

const hostname = 'itransition.yakovlevdev.com';
const port = 443;

const server = createServer((req, res) => {
  const baseUrl = `http://${req.headers.host || 'itransition.yakovlevdev.com'}`;
  const url = new URL(req.url || '/', baseUrl);

  const a = Number(url.searchParams.get('x'));
  const b = Number(url.searchParams.get('y'));

  if (isNaN(a) || isNaN(b)) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('Error: Invalid parameters. Use ?x=number&y=number');
    return;
  }

  const result = checkNoc(a, b);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});

function checkEvclidNod(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function checkNoc(a, b) {
  if (a === 0 && b === 0) return 0;
  if (a === 0 || b === 0) return 0;
  const nod = checkEvclidNod(a, b);
  return Math.abs(a * b) / nod;
}