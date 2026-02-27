import { createFileRoute } from '@tanstack/react-router'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const FILE_NAME = 'Julach_Earzan-Software_Engineer.pdf'

export const Route = createFileRoute('/api/download-cv')({
  server: {
    handlers: {
      GET: async () => {
        try {
          // Resolve path: dev uses project root; Nitro build may serve from .output/public
          const candidates = [
            join(process.cwd(), 'public', FILE_NAME),
            join(process.cwd(), '.output', 'public', FILE_NAME),
          ]
          let fileBuffer: Buffer | null = null
          for (const publicPath of candidates) {
            try {
              fileBuffer = await readFile(publicPath)
              break
            } catch {
              continue
            }
          }
          if (!fileBuffer) throw new Error('CV file not found')

          return new Response(new Uint8Array(fileBuffer), {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `inline; filename="${FILE_NAME}"`,
            },
          })
        } catch (err) {
          console.error('CV download error:', err)
          // Fallback: redirect to static asset (e.g. on Vercel where public is served at root)
          return new Response(null, { status: 302, headers: { Location: `/${FILE_NAME}` } })
        }
      },
    },
  },
})
