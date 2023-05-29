import clsx from "clsx"
// import { renameLowerCase } from "../utils/rename-lowercase"

interface Props {
  selected: string[]
  setSelected: Function
  label: string
  items: any[]
  limit?: number
}

export function MultiSelect({ selected, setSelected, label, items, limit }: Props) {

  function itemsQuantity(){
    const itemsExistInSelected = items.filter(item => {
      // return  selected.filter(row => item.id === row)
      return selected.some(row => item.id === row)
    })
      
    return itemsExistInSelected.length
    
  }

  return (
    <div className="flex flex-col">
      <label
        className="pl-1 py-2 border-b w-full text-zinc-600 text-xs"
        title="Clique nos os alunos"
      >
        {label} ({itemsQuantity()})
      </label>
      <ul className="text-sm grid grid-cols-4">
        {items.map(item => {
          const itemExist = selected?.find(res => res === item.id)
          return (
            <li
              key={item.id}
              className={clsx('border-b py-2 text-center cursor-pointer hover:bg-zinc-100 hover:rounded transition', {
                'bg-blue-200 hover:bg-blue-200 hover:underline': itemExist
              })}

              onClick={() => {

                if (itemExist) {
                  const itemsFilter = selected.filter(res => res !== item.id)
                  return setSelected(itemsFilter)
                }

                if (limit && itemsQuantity() === limit) {
                  return alert(`Selecione somente ${limit}.`)
                }

                return setSelected([...selected, item.id])

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