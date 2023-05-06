import { MenuItem, TextField } from "@mui/material";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { mutate } from "swr";
import { api } from "../utils/axios";
import { Button } from "./Button";
import { Card, Width } from "./Card";
import { translate } from "../utils/translate";
import moment from "moment";


interface Props {
  item: any,
  setItem: Function
  fields?: {
    key: string
    value: string
    type?: string
    // type?: 'text' | 'date' | 'time'
    options?: any[]
  }[]
  uri: string,
  width?: Width
  children?: ReactNode
}


export function Form({ item, setItem, fields, uri, width, children }: Props) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>()

  useEffect(() => {
    setTimeout(() => {
      setErrors(false)
    }, 1500)  
  }, [item])

  async function handleSubmitUpdate(event: FormEvent) {
    event.preventDefault()
    // return console.log(item)
    setLoading(true)
    try {
      if(item?.date){
        item.date = new Date(item.date).toISOString()
      }
      
      await api.put(`${uri}/${item.id}`, item)
      mutate(uri)
    } catch (error: any) {
      const { status } = error.response
      if (status === 400) {
        const { errors } = error.response.data
        setErrors(errors)
        return
      }
      alert('Error no servidor')
      return
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitCreate(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      if(item?.date){
        item.date = new Date(item.date).toISOString()
      }
      // console.log(item)
      // return
      const { data } = await api.post(uri, item)
      setItem(data)
      setErrors('')
      mutate(uri)
    } catch (error: any) {
      const { status } = error.response
      const { data } = error.response
      if (status === 400 && data?.errors) {
        const { errors } = error.response.data
        setErrors(errors)
        return
      }
      if(data.message){
        alert(data.message)
        return 
      }
      alert('Error no servidor')
    } finally {
      setLoading(false)
    }

  }

  return (
    <Card width={width} >
      <form onSubmit={item?.id ? handleSubmitUpdate : handleSubmitCreate}
        className='flex flex-col gap-5'>
   
        {children}
        {fields?.map(field => {
          const value = item[field.key] || ''

          return (
            <TextField
              key={field.key}
              type={field.type || 'text'}
              name={field.key}
              id={field.key}
              label={field.value}
              select={field?.options && true}
              value={field.type === 'date' && value ? moment(value).format('YYYY-MM-DD') : value}
              onChange={event => setItem({ ...item, [field.key]: event.target.value })}
              InputLabelProps={field.type === 'date' || field.type === 'time' ? { shrink: true } : {}}
              error={errors?.[field.key] && true}
              helperText={translate(errors?.[field.key])}>
              {field?.options?.map((option: any) => {
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
              setErrors(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            value='Cancelar'
          />
        </footer>
      </form>
    </Card >
  )
}