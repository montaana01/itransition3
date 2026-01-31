import { createServer } from 'node:http';
import { URL } from 'node:url';

const hostname = '127.0.0.1';
const port = 443;

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const a = url.searchParams.get(x);
  const b = url.searchParams.get(y);

  const result = checkEvclidNoC(a, b);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function checkEvclidNoC(a, b) {
  let result = '';
  let lower;
  let bigger;
  if (b > a) {
    bigger = b;
    lower = a;
  } else {
    bigger = a;
    lower = b;
  }

  while (result === '') {
    minus = bigger - lower;
    if (minus > 0) {
      bigger = lower;
      lower = minus;
      continue;
    } else if (minus = 0) {
      result = bigger;
    }
  }

  return result;
}