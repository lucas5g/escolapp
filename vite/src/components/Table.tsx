import clsx from "clsx";
import { ReactNode } from "react";
import { Card } from "./Card";

interface Props {
  heads: string[]
  items: any[]
  item: any
  setItem: Function
}
export function Table({ heads, items, item, setItem }: Props) {

  const itemsKeys = Object.keys(items[0])

  return (
    <Card>
      <table className="w-full mt-2">
        <thead>
          <tr className="border-b">
            {heads.map(head => {
              return <td key={head} className="pb-3">{head}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((row, index) => {
            return (
              <tr
                key={row.id}
                className={clsx("border-b hover:bg-blue-50 hover:cursor-pointer transition-colors rounded", {
                  'border-b-blue-300 bg-blue-100': row.id === item.id
                })}
                title="Clique para Editar"
                onClick={() => {
                  setItem(row)
                  window.scrollTo({top:0, behavior:'smooth'})
                }}
              >
                {itemsKeys.map(rowKey => {
                  // console.log({rowKey})
                  return rowKey !== 'id' && (
                    <td
                      className="h-12"
                      key={rowKey}>{row[rowKey]}</td>

                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}