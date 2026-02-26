/**
 * On Windows, Nitro's build fails with EPERM when creating a symlink.
 * This script creates a junction (node_modules/.nitro/last-build -> .output)
 * so the build is considered complete. Run after `npm run build` if you see
 * the symlink error. Junctions often work without Administrator.
 */
import { mkdir, symlink, rm, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const linkPath = join(root, 'node_modules', '.nitro', 'last-build')
const targetPath = join(root, '.output')

async function main() {
  if (process.platform !== 'win32') return
  try {
    await access(targetPath)
  } catch {
    console.warn('Skipping: .output not found (run build first)')
    return
  }
  try {
    await rm(linkPath, { recursive: true, force: true })
  } catch {
    // ignore
  }
  await mkdir(dirname(linkPath), { recursive: true })
  await symlink(targetPath, linkPath, 'junction')
  console.log('Created junction: node_modules/.nitro/last-build -> .output')
}

main().catch((err) => {
  console.warn('Could not create Nitro junction (run terminal as Administrator if needed):', err.message)
  process.exit(0) // don't fail the build
})
