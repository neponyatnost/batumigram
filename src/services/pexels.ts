import { createClient } from 'pexels'

const pexelsKey = process.env.REACT_APP_API_PEXELS

if (!pexelsKey) {
  throw new Error('There is no pexels api key')
}

export const pexelsClient = createClient(pexelsKey)
