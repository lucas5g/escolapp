import clsx from "clsx";
import { CircleNotch, Spinner } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../utils/axios";

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (location.pathname !== '/login') location.href = '/login'

  async function handleLogin(event: FormEvent) {
    event.preventDefault()
    console.log({
      email, password
    })


    setLoading(true)

    try {
      const { data } = await api.post('login', {
        email, password
      })
      localStorage.setItem('accessToken', data.accessToken)
      location.href = '/'
    } catch (error: any) {

      const { data } = error?.response

      alert(data)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="bg-white rounded lg:w-1/3 w-full">
        <h1 className="text-center bg-blue-500 text-white py-4 rounded-t text-xl">
          Acesso da Plataforma
        </h1>
        <form onSubmit={handleLogin} className='flex flex-col gap-5 p-5' >

          <Input
            type='email'
            name="email-login"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
          <Input
            type='password'
            name="password-login"
            placeholder="Senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
          <footer className="flex justify-end">
            <Button
              disabled={loading}
              value={'Acessar'}
            />
          </footer>
        </form>
      </div>
    </div>
  )
}