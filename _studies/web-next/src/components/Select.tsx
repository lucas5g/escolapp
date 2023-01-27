import { InputHTMLAttributes } from "react";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  havePlaceholder?: boolean,
  options: string[]
  label?:string
}
export function Select({ havePlaceholder = true, options, label,  ...props }: SelectProps) {
  return (
    <div className="flex flex-col">
      {havePlaceholder &&
        <label className="mb-1" htmlFor={props.id}>{label}</label>
      }
      <select
        className="h-10 pl-2 w-full border-2 border-zinc-400 rounded mb-3 bg-white text-zinc-800"
        {...props}
      >
        {Object.keys(options).map((option:any, index) => (
          <option value={option} className='py-4'>
            {options[option]}
          </option>
        ))} 
      </select>
    </div>
  )
}