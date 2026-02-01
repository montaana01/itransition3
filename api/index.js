import { URL } from 'node:url';

const hostname = 'itransition.yakovlevdev.com';
const port = 443;

export default async function handler(request) {
  try {
    const url = new URL(req.url || '/', baseUrl);
    const pathname = url.pathname;

    if (pathname === '/yakovlevworkby_gmail_com' || pathname === '/yakovlevworkby_gmail_com/') {

      const aRaw = url.searchParams.get('x');
      const bRaw = url.searchParams.get('y');

      const a = parseBigInt(aRaw);
      const b = parseBigInt(bRaw);

      if (a === null || b === null) {
        return new Response('NaN', {
          sttatus: 200,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      const result = checkNoc(a, b);

      return new Response(result.toString(), {
        sttatus: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      return new Response('Incorrect pathname', {
        sttatus: 500,
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('500 Internal Server Error');
  }
};

function checkEvclidNod(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function checkNoc(a, b) {
  if (a === 0n || b === 0n) return 0n;
  const nod = checkEvclidNod(a, b);
  const absA = a < 0n ? -a : a;
  const absB = b < 0n ? -b : b;
  return (absA / nod) * absB;
}

function parseBigInt(value) {
  if (value === null) return null;
  if (value === '') return null;
  if (value.trim() !== value) return null;

  const normalized = normalizeNumericInput(value);
  if (normalized === null) return null;

  const match = /^([+-]?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(normalized);
  if (!match) return null;

  const sign = match[1] === '-' ? -1n : 1n;
  const intPart = match[2];
  const fracPart = match[3] || '';
  const exp = match[4] ? Number(match[4]) : 0;
  if (!Number.isFinite(exp)) return null;

  let digits = intPart + fracPart;
  digits = digits.replace(/^0+/, '') || '0';

  const netExp = exp - fracPart.length;
  let result;
  if (netExp >= 0) {
    digits += '0'.repeat(netExp);
    result = sign * BigInt(digits);
  } else {
    const shift = -netExp;
    if (shift >= digits.length) return null;
    const tail = digits.slice(-shift);
    if (!/^0+$/.test(tail)) return null;
    const head = digits.slice(0, -shift) || '0';
    result = sign * BigInt(head);
  }

  if (result <= 0n) return null;
  return result;
}


function normalizeNumericInput(value) {
  if (/[^\S ]/.test(value)) return null;
  if (!/\s/.test(value)) return value;

  const match = /^([+-]?\d+(?:\.\d+)?[eE]) (\d+)$/.exec(value);
  if (!match) return null;

  return `${match[1]}+${match[2]}`;
}