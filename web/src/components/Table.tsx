import clsx from "clsx";
import moment from "moment";
moment.locale('pt-br');

import { Card, Width } from "./Card";
import { translate } from "../utils/translate";
import { Input } from "./Input";
import { useState } from "react";
import { X } from "phosphor-react";
import { storageLogged } from "../utils/storage-logged";
import { api } from "../utils/axios";
import { mutate } from "swr";
interface Props {
  fields: any[]
  items: any[]
  item: any
  setItem: Function
  width?: Width
  positionBottom?: number
  placeholderInputFilter?: string
  deleteItem?: boolean,
  isEditable?:boolean
}


export function Table({
  fields,
  items: itemsWithoutFilter,
  item,
  setItem,
  width = 100,
  positionBottom = 500,
  placeholderInputFilter = 'Pesquisar por nome.',
  deleteItem = false,
  isEditable = true
}: Props) {
  const [search, setSearch] = useState('')
  const logged = storageLogged()

  const items = itemsWithoutFilter
    .filter(item => {
      const searchFilter = search.toLowerCase().trim()
      return (
        item.name?.toLowerCase().includes(searchFilter) ||
        moment(item.date).format('DD/MM').includes(search) ||
        item.modality?.name?.toLowerCase().includes(searchFilter) ||
        item.email?.includes(searchFilter)

      )

    })

  return (

    <Card width={width}>
      <div className="mb-3">
        <Input
          label="Pesquisar"
          placeholder={placeholderInputFilter}
          name="search"
          onChange={event => setSearch(event.target.value)}
          value={search}
          setSearch={setSearch}
        />
      </div>
      {items.length === 0 &&
        <p className="text-gray-500 ml-1" >Sem registros.</p>
      }

      {items.length > 0 &&
        <div className="flex flex-col gap-3">

          <table className="w-full mt-2">
            <thead>
              <tr className="border-b font-semibold ">
                <td className="pb-2">N°</td>
                {fields.map(head => {
                  return (
                    <td key={head.key} className="pb-2 px-2">
                      {head.value}
                    </td>
                  )
                })}
              </tr>
            </thead>
            <tbody className="">
              {items.map((row, i) => {
                return (
                  <tr
                    key={row.id}
                    className={clsx("border-b hover:bg-blue-50 transition-colors rounded text-sm", {
                      'border-b-blue-300 bg-blue-100': row.id === item.id,
                      'hover:cursor-pointer':isEditable
                      // 'text-sm': item.id
                    })}
                    title={isEditable ? 'Clique para Editar':''}
                    onClick={() => {
                      if ('date' in row) {
                        setItem({ ...row, date: moment(row.date).toDate() })
                      } else {
                        setItem(row)
                      }
                      const width = document.querySelector('body')?.offsetWidth
                      if (Number(width) > 1024) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      } else {
                        window.scrollTo({ top: positionBottom, behavior: 'smooth' })
                      }
                    }}
                  >
                    <td className="h-10">
                      {i + 1}
                    </td>
                    {fields.map(field => {
                      const keyName = field.key.replace('Id', '')
                      if (field.key === 'date') {
                        return (
                          <td key={field.key}>
                            {moment(row[field.key]).locale('pt-br').format('DD/MM')}
                          </td>
                        )
                      }
                      return (
                        <td
                          className="h-10 px-2"
                          key={field.key}>

                          {translate(row[keyName]?.['name']) ?? translate(row[field.key])}
                        </td>
                      )
                    })}
                    {deleteItem && (logged?.profile === 'manager' || logged?.profile === 'admin' || logged?.profile === 'coordinator') &&
                      <td
                        className="px-2"
                        title="Deletar?"
                        onClick={async () => {
                          if (!confirm(`Deseja deletar ${row.name}?`)) return

                          try {
                            const uri = localStorage.getItem('uri')
                            await api.delete(`${uri}/${row.id}`)
                            setItem({})
                            mutate(uri)
                          } catch (error: any) {
                            alert(error.response.data.message)
                          }
                        }}
                      >
                        <X
                          weight="bold"
                          className="hover:text-red-500"
                          size={15}
                        />
                      </td>
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      }
    </Card>
  )
}