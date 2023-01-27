
import { ButtonHTMLAttributes, ChangeEvent, FormEvent, useState } from "react"
import cx from 'classnames'

import { api } from "@/utils/axios"
import { sleep } from "../utils"
import { mutate } from "swr"
import { CircleNotch } from "phosphor-react"
import { TextField } from "@mui/material"


interface FormProps {
  item: any
  setItem: Function
  fields: {
    key: string,
    value: string,
    fullWidth?: boolean
  }[]
  uri: string
  title?: string
  labelButton?: string
}

interface Alert {
  msg: string
  status: number
}

export function Form({
  item,
  setItem,
  fields,
  uri,
  title,
  labelButton
}: FormProps) {

  const [alert, setAlert] = useState({} as Alert)
  const [loading, setLoading] = useState(false)

  const timeAlert = 6000

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setItem({
      ...item,
      [name]: getType(name) === 'number' ? Number(value) : value
    })
  }

  function getType(key: string) {
    const type: any = {
      codcur: 'number',
      codper: 'number',
      teamsQuantity: 'number',
      membersQuantity: 'number'
    }
    return type[key]
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    if (uri === 'login') {
      try {
        const { data } = await api.post(uri, item)
        localStorage.setItem('accessToken', data.accessToken)
        window.location.href = '/'

      } catch (error: any) {
        const { response } = error
        const { data, status } = response
        if (status === 500) {
          setAlert({
            status,
            msg: 'Erro ao conectar no servidor!'
          })
        }
        setLoading(false)
        return 
      } 
      return
    }

    if (item.id) {
      try {

        await api.put(`${uri}/${item.id}`, item)
        mutate(uri)
        setAlert({
          status: 200,
          msg: `${item.name} Atualizado.`
        })

      } catch (error: any) {
        const { response } = error
        const { data, status } = response

        if (status === 500) {
          setAlert({
            status,
            msg: 'Erro ao tentar atualizar :('
          })
          return
        }

        setAlert({
          status,
          msg: data.msg
          // msg: 'erro'
        })
      } finally {
        setLoading(false)
        await sleep(timeAlert)
        setAlert({} as Alert)
      }

      return
    }

    try {

      const { data } = await api.post(uri, item)
      mutate(uri)
      setItem(data)
      setAlert({
        status: 201,
        msg: `${item.name} Cadastrado.`
      })


    } catch (error: any) {
      const { response } = error
      const { data, status } = response

      // console.log({ status })

      if (status === 500) {
        setAlert({
          status,
          msg: 'Erro ao tentar salvar :('
        })
        return
      }

      setAlert({
        status: 400,
        msg: data.msg
      })
    } finally {
      setLoading(false)
      await sleep(timeAlert)
      setAlert({} as Alert)
    }



  }

  return (


    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded shadow-xl h-full"
    >
      <span className={cx('absolute right-5 top-20 border-l-4 text-end py-4 px-10 rounded transition-all delay-200', {
        'text-cyan-800 bg-cyan-100 border-cyan-800': alert.status === 300,
        'text-yellow-800 bg-yellow-100 border-yellow-800': alert.status === 400 || alert.status === 404,
        'text-red-800 bg-red-100 border-red-800': alert.status === 500,
        'text-green-800 bg-green-100 border-l-4 border-green-800': alert.status === 200 || alert.status === 201,
        'opacity-100': alert.msg,
        'opacity-0': !alert.msg

      })}
      >
        {alert.msg}
      </span>
      {title &&
        <header className="bg-blue-500 text-gray-100 font-bold text-center py-5 rounded-t">
          {title}
        </header>
      }

      <div className="p-5" >
        {fields.map(field => {

          return (

            <TextField
              label={field.value}
              name={field.key}
              id={field.key}
              fullWidth
              margin="dense"
              type={getType(field.key)}
              value={item[field.key] || ''}
              key={field.key}
              onChange={handleChange}
              required
            // error
            // helperText='teste'
            // className='gap-2'
            />

          )

        })

        }
        <footer className="mt-2 flex gap-2 justify-end font-medium">

          <Button type="submit" disabled={loading} id="buttonSubmit">
            {loading && (
              <>
                <CircleNotch size={22} weight='bold' className="animate-spin" />
                Carregando...
              </>
            )}
            {!loading && labelButton && labelButton}
            {!loading && !labelButton && item.id && 'ATUALIZAR'}
            {!labelButton && !item.id && 'CADASTRAR'}
          </Button>
          {!labelButton &&
            <Button
              secondary
              onClick={() => setItem({})}
              type='reset'
            >
              CANCELAR
            </Button>
          }
        </footer>
      </div>

    </form>

  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean
}
function Button({ secondary = false, ...props }: ButtonProps) {
  return (
    <button
      className={cx('h-12 w-32 rounded text-sm font-bold text-white border flex justify-center items-center', {
        'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400': !secondary,
        'bg-red-500 hover:bg-red-700': secondary,
      })
      }
      {...props}

    />
  )
}