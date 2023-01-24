import clsx from "clsx"
import { CircleNotch } from "phosphor-react"
import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
}
export function Button({ ...props }: Props) {
  return (
    <button
      className={clsx("bg-blue-500 text-white  w-32 h-11 rounded flex items-center justify-center hover:bg-blue-600 disabled:bg-blue-400")}
      {...props}
    >
      {props.disabled &&
        <CircleNotch className="animate-spin" size={20} color='#ffffff' weight="bold" />}
      {!props.disabled && props.value}

    </button>

  )
}