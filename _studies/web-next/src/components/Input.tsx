import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  havePlaceholder?: boolean
}
export function Input({ havePlaceholder = true, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {havePlaceholder &&
        <label className="mb-1" htmlFor={props.id}>{props.placeholder}</label>
      }
      <input
        className="h-10 pl-2 w-full border-2 border-zinc-400 rounded mb-3"
        {...props}
      />
    </div>
  )
}