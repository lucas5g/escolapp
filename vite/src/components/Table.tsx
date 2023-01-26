import clsx from "clsx";
import { ReactNode } from "react";
import { Card, Width } from "./Card";

interface Props {
  fields: any[]
  items: any[]
  item: any
  setItem: Function
  width?: Width
}
export function Table({ fields, items, item, setItem, width = 100 }: Props) {


  return (
    <Card width={width}>
      <table className="w-full mt-2">
        <thead className="">
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
          {items.map((row, index) => {
            // console.log({width})
            return (
              <tr
                key={row.id}
                className={clsx("border-b hover:bg-blue-50 hover:cursor-pointer transition-colors rounded", {
                  'border-b-blue-300 bg-blue-100': row.id === item.id,
                  'text-sm': item.id
                })}
                title="Clique para Editar"
                onClick={() => {
                  setItem(row)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {fields.map(field => {
                  const keyName = field.key.replace('Id', '')
                  return (
                    <td
                      className="h-14 text-end first:text-start"
                      key={field.key}>{row[keyName]?.['name'] ?? row[field.key]}</td>
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