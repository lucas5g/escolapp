import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}
export function Input({ ...props }: Props) {

  function getType(key: string) {
    const type: any = {
      codcur: 'number',
      codper: 'number',
      teamsQuantity: 'number',
      membersQuantity: 'number'
    }
    return type[key]
  }


  return (
    <label className="relative text-gray-800">
      <input
        name={props.name}
        id={props.name}
        className="w-full px-4 py-3  outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-blue-600 focus:bg-white bg-white open:bg-green-500"
        {...props}
        placeholder=''
        type={getType(props.name ?? '')}
      />
      <span className='absolute left-0 top-[.9em] px-1  tracking-wide peer-focus:text-blue-600 pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-6 bg-white ml-2 peer-valid:text-sm peer-valid:-translate-y-6 peer-focus:bg-white text-gray-500' >
        {props.placeholder}
      </span>

    </label>
  )
}