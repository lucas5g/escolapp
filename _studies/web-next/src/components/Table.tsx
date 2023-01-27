import { TextField } from "@mui/material"
import { Close } from '@mui/icons-material'
import { useState } from "react"
import cx from 'classnames'


interface TableProps {
  fields: {
    key: string
    value: string
  }[],
  items: Array<any>
  search: string
  setItem: Function
  setSearch: Function
}

export function Table({
  fields,
  items,
  search,
  setItem,
  setSearch
}: TableProps) {

  const [activeItem, setActiveItem] = useState(0)

  return (

    <div className="w-full bg-white rounded p-5 shadow-lg ">

      <TextField
        label="Pesquisar"
        value={search}
        fullWidth
        onChange={event => setSearch(event.target.value)}
        margin='dense'
        InputProps={{
          endAdornment: (
            <>
              {search &&
                <Close className="text-gray-400 hover:cursor-pointer" onClick={() => setSearch('')} />
              }
            </>
          )
        }}
      />
      {/* {console.log(items)}
      {console.log(activeItem)} */}
      {items.length > 0 &&
        <table className="w-full mt-2">
          <thead className="border-b ">
            <tr>
              <td className='pb-3'>N°</td>
              {fields.map(field => (
                <td key={field.key} className='pb-3'>
                  {field.value}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr
                onClick={() => {
                  setItem(item)
                  setActiveItem(item.id)
                }}
                key={index}
                title={`Clique para Editar`}
                className={cx('hover:cursor-pointer hover:bg-blue-50 border-b', {
                  'bg-blue-50 font-semibold': activeItem === item.id
                })}
              >
                <td className="h-10" >
                  {index + 1}
                </td>
                {fields.map(field => (
                  <td key={field.key} >
                    {item[field.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
      {items.length === 0 && <p>Nenhum Resuldado encontrado.</p>}
    </div>
  )
}