import { MenuItem, TextField } from "@mui/material";
import moment from "moment";
import { FormEvent, ReactNode, useState } from "react";
import { mutate } from "swr";
import { api } from "../utils/axios";
import { Button } from "./Button";
import { Card, Width } from "./Card";

interface Props {
  item: any,
  setItem: Function
  fields: any[]
  uri: string,
  width?: Width
  children?: ReactNode
}


export function Form({ item, setItem, fields, uri, width, children }: Props) {

  const [loading, setLoading] = useState(false)

  async function handleSubmitUpdate(event: FormEvent) {
    event.preventDefault()
    // return console.log(item)
    setLoading(true)
    try {
      await api.put(`${uri}/${item.id}`, item)
      mutate(uri)
    } catch (error: any) {
      const { message } = error.response.data
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitCreate(event: FormEvent) {
    event.preventDefault()
    // return console.log(item)
    setLoading(true)
    try {
      const { data } = await api.post(uri, item)
      setItem(data)
      mutate(uri)
    } catch (error: any) {
      const { message } = error.response.data
      alert(message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <Card width={width} >
      <form onSubmit={item?.id ? handleSubmitUpdate : handleSubmitCreate}
        className='flex flex-col gap-5'>

        {children}

        {fields.map(field => {
          // console.log(item, field)
          const value = item[field.key] || ''
          // const inputLabelProps = {}
          // return 
          return (
            <TextField
              key={field.key}
              type={field.type || 'text'}
              name={field.key}
              id={field.key}
              label={field.value}
              select={field?.options?.length > 0}
              value={value}
              onChange={event =>  setItem({ ...item, [field.key]: event.target.value })}
            // size='small'                 
            // props
            >
              {field?.options?.map((option: any) => {
                // console.log(option)
                return (
                  <MenuItem
                    key={option.id}
                    value={option.id}

                  >
                    {option.name}
                  </MenuItem>
                )
              })}
            </TextField>
          )
        })}


        <footer className="flex justify-end gap-3">
          <Button value={item?.id ? 'Atualizar' : 'Cadastrar'} disabled={loading} />
          <Button
            type='reset'
            secondary
            onClick={() => {
              setItem({})
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            value='Cancelar'
          />
        </footer>
      </form>
    </Card >
  )
}