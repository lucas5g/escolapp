import axios from 'axios'

const accessToken = () => {
  const accessToken = localStorage.getItem('accessToken')
  if(!accessToken) return null 
  return accessToken
}
 
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken()}`
  }
})