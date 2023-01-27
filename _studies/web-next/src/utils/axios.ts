import axios from 'axios'


function authentication(){
  if(typeof window !== 'undefined'){
    return window.localStorage.getItem('accessToken')
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers:{
    Authorization: `Bearer ${authentication()}`
  }
})
