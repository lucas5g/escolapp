import clsx from "clsx"
import { renameLowerCase } from "../utils/rename-lowercase"

interface Props{
  selected:string[] 
  setSelected: Function
  label:string
  items: any[]
}

export function MultiSelect({selected, setSelected, label, items}:Props) {
  return (
    <div className="flex flex-col">
      <label
        className="pl-1 py-2 border-b w-full text-zinc-600 text-xs"
        title="Clique nos os alunos"
      >
        {label} ({selected.length})
      </label>
      <ul className="text-sm grid grid-cols-4">
        {items.map(item => {
          const itemExist = selected?.find(res => res === item.id)
          return (
            <li
              key={item.id}
              className={clsx('border-b py-2 pl-4 cursor-pointer hover:bg-zinc-100 hover:rounded', {
                'bg-blue-200 hover:bg-blue-200 hover:line-through': itemExist
              })}

              onClick={() => {
                if (!itemExist) {
                  return setSelected([...selected, item.id])
                }
                const itemsFilter = selected.filter(res => res !== item.id)
                return setSelected(itemsFilter)

              }}
              title={item.name}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}