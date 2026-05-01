import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const root = path.resolve('public')
const port = Number(process.env.PORT ?? 5173)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, { 'Content-Type': mime[ext] ?? 'application/octet-stream' })
  createReadStream(filePath).pipe(res)
}

const server = http.createServer((req, res) => {
  try {
    const reqUrl = new url.URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
    const pathname = decodeURIComponent(reqUrl.pathname)
    const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
    let filePath = path.join(root, safePath)

    if (safePath === '/' || safePath === '') filePath = path.join(root, 'index.html')

    if (!existsSync(filePath)) {
      // SPA fallback
      filePath = path.join(root, 'index.html')
    }

    const st = statSync(filePath)
    if (st.isDirectory()) filePath = path.join(filePath, 'index.html')

    sendFile(res, filePath)
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`Server error: ${e?.message ?? e}`)
  }
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log('If styles look wrong, run: npm run watch')
})

