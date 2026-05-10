import axios from 'axios'

export const apiClient = axios.create({
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})
