import clsx from "clsx"
import { CircleNotch } from "phosphor-react"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // primary?:boolean
  secondary?:boolean 

}
export function Button({ secondary=false, ...props }: Props) {
  return (
    <button
      className={clsx("text-white w-32 h-11 rounded flex items-center justify-center", {
        'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400': !secondary,
        'bg-red-500 hover:bg-red-600':secondary
      })}
      {...props}
    >
      {props.disabled &&
        <CircleNotch className="animate-spin" size={20} color='#ffffff' weight="bold" />}
      {!props.disabled && props.value}

    </button>

  )
}