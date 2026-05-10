import { serviceConfig } from '../lib/config.js'

export function createRoomId(prefix = 'pilot') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export async function getStreamUserToken(user) {
  if (serviceConfig.stream.userToken) {
    return serviceConfig.stream.userToken
  }

  if (!serviceConfig.stream.tokenEndpoint) {
    return null
  }

  const response = await fetch(serviceConfig.stream.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id }),
  })

  if (!response.ok) {
    throw new Error('Unable to fetch Stream user token')
  }

  const data = await response.json()
  return data.token
}
