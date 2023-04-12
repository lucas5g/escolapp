import { MenuItem, TextField } from "@mui/material";
import clsx from "clsx";

interface Props {
  label: string
  name: string
  value?: string | number
  onChange: (event: any) => any
  required?: boolean
  type?: 'text' | 'email' | 'number' | 'password' | 'date' | 'time'
  inputLabelOpen?: boolean
  options?: {
    id: number,
    name: string
  }[]
}
export function Input({ inputLabelOpen = false, options, ...props }: Props) {

  function getType(key: string) {
    const type: any = {
      codcur: 'number',
      codper: 'number',
      teamsQuantity: 'number',
      membersQuantity: 'number'
    }
    return type[key]
  }
  // console.log(options)
  return (
    <TextField
      type={props.type ?? 'text'}
      name={props.name}
      id={props.name}
      label={props.label}
      select={options?.length !== undefined && options.length > 0}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      InputLabelProps={inputLabelOpen ? { shrink: true } : {}}
      fullWidth
    >
      {/* <MenuItem value='0'>
        Selecione
      </MenuItem> */}
      {options?.map(option => {
        return (
          <MenuItem
            key={option.id}
            value={option.id ?? ''}

          >
            {option.name}
          </MenuItem>
        )
      })}
    </TextField>

  )
}