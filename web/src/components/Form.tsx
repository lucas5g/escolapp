import { MenuItem, TextField } from "@mui/material";
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
      const { data } = await api.post(uri, item)
      setItem(data)
      mutate(uri)
    } catch (error: any) {
      const { data } = error.response
      alert(data)
    } finally {
      setLoading(false)
    }

  }
  
  function getType(key:string){
    const type:any = {
      codcur: 'number',
      codper: 'number',
      teamsQuantity: 'number',
      membersQuantity: 'number',
      date: 'date',
      startHours: 'time'
    }

    return type[key]
  }

  // return item.id && (
  return (
    <Card width={width} >
      <form onSubmit={item.id ? handleSubmitUpdate : handleSubmitCreate}
        className='flex flex-col gap-6'>

        {fields.map(field => {
          const value = item[field.key] || ''
   
          return (
            <TextField
              key={field.key}
              type={getType(field.key)}
              name={field.key}
              label={field.value}
              select={field?.options?.length > 0}
              value={value ?? new Date()}
              focused={field.key === 'date' || field.key === 'startHours'}
              onChange={event => setItem({ ...item, [field.key]: event.target.value })}

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

        {children}

        <footer className="flex justify-end gap-3">
          <Button value={item.id ? 'Atualizar' : 'Cadastrar'} disabled={loading} />
          <Button secondary onClick={() => setItem({})} type='reset' value='Cancelar' />
        </footer>
      </form>
    </Card >
  )
}