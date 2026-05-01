import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const cmd = process.argv[2]
if (!cmd) {
  console.error('Usage: node ./scripts/vite.mjs <dev|build|preview>')
  process.exit(1)
}

// Some environments set a global Tailwind ESM loader (Tailwind v4) via NODE_OPTIONS.
// That breaks Vite resolution when Tailwind v4 is not installed.
const env = { ...process.env }
delete env.NODE_OPTIONS

// Ensure esbuild uses the real Windows binary, not a shim.
env.ESBUILD_BINARY_PATH = path.resolve('node_modules/@esbuild/win32-x64/esbuild.exe')

const viteCli = path.resolve('node_modules/vite/bin/vite.js')
const args = [viteCli]
if (cmd !== 'dev') args.push(cmd)

const child = spawn(process.execPath, args, { stdio: 'inherit', env })
child.on('exit', (code) => process.exit(code ?? 0))

