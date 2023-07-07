import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../utils/axios";
import { translate } from "../utils/translate";
import { sleep } from "../utils/sleep";


export function Login() {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>()

  if (location.pathname !== '/login') location.href = '/login'

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      const { data } = await api.post('login', {
        email,
        password
      })
      localStorage.setItem('accessToken', data.accessToken)
      location.href = '/'
      await sleep(1000)
    } catch (error: any) {
      const { message, errors } = error?.response.data
      if (
        message.includes('Please make sure your database server') || message.includes('Environment variable not found:') ||
        message.includes('Invalid `prisma.user.findUnique()`')
      ) {
        return alert('Erro no Banco de Dados :(')
      }
      if (errors) {
        return setErrors(errors)
      }
      return alert(message)
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
            label="E-mail"
            value={email ?? ''}
            onChange={event => setEmail(event.target.value)}
            error={translate(errors?.email)}
          />
          <Input
            type='password'
            name="password-login"
            label="Password"
            value={password ?? ''}
            onChange={event => setPassword(event.target.value)}
            error={translate(errors?.password)}
            autoComplete="no"

          />
          <footer className="flex justify-end">
            <Button
              id="button-login"
              disabled={loading}
              value={'Acessar'}
            />
          </footer>
        </form>
      </div>
    </div>
  )
}