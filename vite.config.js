import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function localApiPlugin(mode) {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  const routes = {
    '/api/generate-questions': () => import('./api/generate-questions.js'),
    '/api/generate-feedback': () => import('./api/generate-feedback.js'),
    '/api/stream-token': () => import('./api/stream-token.js'),
  }

  return {
    name: 'interviewpilot-local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname
        const loadRoute = routes[pathname]

        if (!loadRoute) {
          next()
          return
        }

        let rawBody = ''
        for await (const chunk of req) {
          rawBody += chunk
        }

        req.body = rawBody

        const response = {
          status(code) {
            res.statusCode = code
            return this
          },
          setHeader(name, value) {
            res.setHeader(name, value)
            return this
          },
          json(payload) {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json')
            }
            res.end(JSON.stringify(payload))
            return this
          },
        }

        try {
          const { default: handler } = await loadRoute()
          await handler(req, response)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Local API route failed', message: error.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localApiPlugin(mode)],
}))
