import clsx from "clsx";
import moment from "moment";
moment.locale('pt-br');

// import 'moment/locale/pt-br'

import { Card, Width } from "./Card";
interface Props {
  fields: any[]
  items: any[]
  item: any
  setItem: Function
  width?: Width
  positionBottom?: number
}


export function Table({
  fields,
  items,
  item,
  setItem,
  width = 100,
  positionBottom = 500
}: Props) {
  // console.log(item)
  return (

    <Card width={width}>
      {items.length === 0 &&
        <p className="text-gray-500" >Sem registros.</p>
      }
      {items.length > 0 &&
        <table className="w-full mt-2">
          <thead>
            <tr className="border-b font-semibold">
              {fields.map(head => {
                return (
                  <td key={head.key} className="pb-3 pr-1 text-end first:text-start">
                    {head.value}
                  </td>
                )
              })}
            </tr>
          </thead>
          <tbody className="">
            {items.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={clsx("border-b hover:bg-blue-50 hover:cursor-pointer transition-colors rounded text-sm", {
                    'border-b-blue-300 bg-blue-100': row.id === item.id,
                    // 'text-sm': item.id
                  })}
                  title="Clique para Editar"
                  onClick={() => {
                    if('date' in row){
                      setItem({...row, date: moment(row.date).toDate()})
                    }else{
                      setItem(row)
                    }
                    const width = document.querySelector('body')?.offsetWidth
                    if (Number(width) > 1024) {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      window.scrollTo({ top: positionBottom, behavior: 'smooth' })
                      // window.scrollBy({top:1500})
                    }
                  }}
                >
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
                        className="h-14 text-end first:text-start"
                        key={field.key}>
                        {row[keyName]?.['name'] ?? row[field.key]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </Card>
  )
}