import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Julach Earzan | Software Engineer | React, Next.js Developer',
      },
      {
        name: 'description',
        content:
          'Julach Earzan is a Software Engineer specializing in React, Next.js and modern web development. Explore projects, experience, and portfolio.',
      },
      {
        name: 'keywords',
        content:
          'Julach Earzan, Software Engineer, React Developer, Next.js Developer, Full Stack Developer Sri Lanka',
      },
      { name: 'author', content: 'Julach Earzan' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
