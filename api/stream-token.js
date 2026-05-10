import { StreamClient } from '@stream-io/node-sdk'

function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.STREAM_API_KEY || process.env.VITE_STREAM_API_KEY
  const apiSecret = process.env.STREAM_API_SECRET

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ error: 'Missing Stream API key or secret' })
  }

  const { userId } = readBody(req)

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' })
  }

  const client = new StreamClient(apiKey, apiSecret)
  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: 60 * 60,
  })

  return res.status(200).json({ token })
}
