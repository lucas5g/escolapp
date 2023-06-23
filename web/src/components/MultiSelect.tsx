import clsx from "clsx"
// import { renameLowerCase } from "../utils/rename-lowercase"

interface Props {
  selected: any[]
  setSelected: Function
  label: string
  items: any[]
  limit?: number
  columns?: number
}

export function MultiSelect({ selected, setSelected, label, items, limit, columns }: Props) {

  function itemsQuantity() {
    const itemsExistInSelected = items.filter(item => {
      // return  selected.filter(row => item.id === row)
      return selected.some(row => item.id === row)
    })
    // console.log('itemsExistInSelected => ', itemsExistInSelected)
    // console.log('selected => ', selected.length)
    // console.log('items => ', items)
    return itemsExistInSelected.length

  }

  function itemsSelected(){
    const itemsExistInSelected = items.filter( item => {
      return selected.some( row => item.id === row)
    })

    return itemsExistInSelected
  }

  // console.log('students => ', items)
  // console.log('selected => ', selected)

  return (
    <div className="flex flex-col">
      <label
        className="pl-1 py-2 border-b w-full text-zinc-600 text-xs"
        title="Clique nos os alunos"
      >
        {label} ({itemsQuantity()})
      </label>
      <ul className={clsx("text-sm grid grid-cols-3", {
        'grid-cols-2': columns
      })}>
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

                const itemsSelected = [...selected, item.id]
   
                return setSelected(itemsSelected)

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