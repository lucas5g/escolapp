import { createContext, ReactNode, useEffect, useState } from "react";

interface Props{
  children: ReactNode
}

export const AuthContext = createContext({}) 

export const AuthProvider = ({children}:Props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
  })

  const login = (email:string, password:string) => {
    
  }

  return (
    <AuthContext.Provider value={{ user, login}}>
      {children}
    </AuthContext.Provider>
  )

}
