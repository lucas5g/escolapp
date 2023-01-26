import { X } from "phosphor-react";
import { FormEvent, useState } from "react";
import { mutate } from "swr";
import { api } from "../utils/axios";
import { Button } from "./Button";
import { Card, Width } from "./Card";
import { Input } from "./Input";

interface Props {
  item: any,
  setItem: Function
  fields: any[]
  uri: string,
  width?: Width  
}

export function Form({ item, setItem, fields, uri, width}: Props) {

  const [loading, setLoading] = useState(false)


  async function handleSubmitUpdate(event: FormEvent) {
    event.preventDefault()

    setLoading(true)

    try {
      await api.put(`${uri}/${item.id}`, item)
      mutate(uri)
    } catch (error: any) {
      const { data } = error.response
      alert(data)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitCreate(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      await api.post(uri, item)
      mutate(uri)
    } catch (error: any) {
      const { data } = error.response
      alert(data)
    } finally {
      setLoading(false)
    }

  }

  return item.id && (
  // return (
    <Card width={width} >

        <div className="flex justify-end mb-5">
          <button
            title='Fechar formulário'
            className="bg-red-400 p-1 rounded hover:bg-red-600"
            onClick={() => setItem({})}
            type='button'
          >
            <X className="" size={20} color='#ffffff' weight="bold" />
          </button>

        </div>

        <form onSubmit={item.id ? handleSubmitUpdate : handleSubmitCreate}
          className='flex flex-col gap-6'>

          {fields.map(field => {
            const value = item[field.key] || ''
            return (
              <Input
                key={field.key}
                name={field.key}
                placeholder={field.value}
                value={value}
                onChange={event => setItem({ ...item, [field.key]: event.target.value })}
                required
              />
            )
          })}

          <footer className="flex justify-end">
            <Button value={item.id ? 'Atualizar' : 'Cadastrar'} disabled={loading} />
          </footer>

        </form>
    </Card>
  )
}