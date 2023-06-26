import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { mutate } from "swr";
import { api } from "../utils/axios";
import { Button } from "./Button";
import { Card, Width } from "./Card";
import { translate } from "../utils/translate";
import moment from "moment";
import { storageLogged } from "../utils/storage-logged";
import { Input } from "./Input";
import { swr } from "../utils/swr";
import { UnityInterface } from "../interfaces";


interface Props {
  item: any,
  setItem: Function
  fields?: {
    key: string
    value: string
    type?: string
    // type?: 'text' | 'date' | 'time'
    options?: any[]
    multiple?: any
    disabled?: boolean
  }[]
  uri: string,
  width?: Width
  children?: ReactNode
  hasButtonCancel?: boolean
  title?: string
}


export function Form({ item, setItem, fields, uri, width, children, hasButtonCancel = true, title }: Props) {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>()

  useEffect(() => {
    setTimeout(() => {
      setErrors(false)
    }, 1500)
  }, [item])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {

      item.unityId = storageLogged().unityId

      if (item?.date) {
        item.date = new Date(item.date).toISOString()
      }

      if (uri === 'update-me') {

        await api.put('update-me', item)
      } else if (item.id) {
        // console.log(item)
        await api.put(`${uri}/${item.id}`, item)
      } else {
        await api.post(uri, item)
        setItem({})
        // setItem(data)
      }
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
      if (data.message) {
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
      {title &&
        <h2 className="text-zinc-600 text-lg mb-2 text-right italic">
          {title}
        </h2>
      }
      <form onSubmit={handleSubmit}
        className='flex flex-col gap-5'>

        {children}
        {fields?.map(field => {


          if (field?.multiple) {
            return (
              <Autocomplete
                key={field.key}
                multiple
                options={field.options || []}
                getOptionLabel={(option) => option.name}
                noOptionsText='Preencha todos os campos anteriores.'
                filterSelectedOptions
                isOptionEqualToValue={(option, item) =>
                  option.name === item.name
                }
                onChange={(event, names) => {
                  console.log(names)
                  setItem({ ...item, [field.key]: names })
                }}
                value={item[field.key] ?? []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Equipes'
                    placeholder="Clique para adicionar"
                  />
                )}

              />

            )
          }

          /**
           * Quando não admin e o campo for unidade, ocultar o campo de unidade.
           */


          const valueInput = () => {

            return item[field.key] || ''
          }
          const value = valueInput()
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
              helperText={translate(errors?.[field.key])}
              autoComplete="on"
              disabled={field.disabled}
              size="small"
            >
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
        {/* {console.log(logged)} */}
        {/* {logged.profile === 'manager' && uri !== 'unities' && unities && 
          <Input
            name='unityId'
            label="Unidade"
            options={unities.map(unity => {
              return {
                id: unity.id,
                name: unity.name
              }
            })}
            // options={[
            //   { id: 1, name: 'Belo Horizonte' },
            //   { id: 2, name: 'Contagem' }
            // ]}
            value={item.unityId ?? logged.unity.id}
            onChange={event => setItem({ ...item, unityId: event.target.value })}
          />
        } */}


        <footer className="flex justify-end gap-3">
          <Button value={item?.id ? 'Atualizar' : 'Cadastrar'} disabled={loading} />
          {hasButtonCancel &&
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
          }
        </footer>
      </form>
    </Card >
  )
}