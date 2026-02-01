export default function handler(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Use /api/yakovlevworkby_gmail_com?x={}&y={}');
}
