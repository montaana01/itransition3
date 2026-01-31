import { createServer } from 'node:http';
import { URL } from 'node:url';

const hostname = '0.0.0.0';
const port = 443;

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const a = Number(url.searchParams.get('x'));
  const b = Number(url.searchParams.get('y'));

  const result = checkNoc(a, b);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function checkNoc(a, b) {
  if (a === 0 && b === 0) return 0;
  return Math.abs(a * b) / checkEvclidNod(a, b);
}

function checkEvclidNod(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (minus !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}