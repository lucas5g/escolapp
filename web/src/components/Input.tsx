import { InputAdornment, MenuItem, TextField } from "@mui/material";
import clsx from "clsx";
import { translate } from "../utils/translate";
import { Search } from "@mui/icons-material";
import { X } from "phosphor-react";

interface Props {
  label: string
  name: string
  value?: string | number
  onChange?: (event: any) => any
  required?: boolean
  type?: 'text' | 'email' | 'number' | 'password' | 'date' | 'time'
  inputLabelOpen?: boolean
  register?: any
  error?: string
  setSearch?: (text:string) => any
  placeholder?:string
  className?:string
  options?: {
    id: number,
    name: string
  }[]
}
export function Input(props: Props) {

  if (props.register) {
    return (
      <TextField
        type={props.type ?? 'text'}
        id={props.name}
        label={props.label}
        InputLabelProps={props.inputLabelOpen ? { shrink: true } : {}}
        {...props.register(props.name)}
        error={props.error ? true : false}
        helperText={translate(props.error || '')}

      />
    )
  }

  return (
    <TextField
      type={props.type ?? 'text'}
      name={props.name}
      id={props.name}
      label={props.label}
      select={props.options !== undefined}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      InputLabelProps={props.inputLabelOpen ? { shrink: true } : {}}
      fullWidth
      error={props.error ? true : false}
      helperText={translate(props.error ?? '')}
      placeholder={props?.placeholder}
      // className={props.className}
      InputProps={props.setSearch && {
        endAdornment: (
          <InputAdornment 
            position="end" 
            className="cursor-pointer"
            onClick={() => props.setSearch && props.setSearch('')}
            
            >
            <X size={20}  weight="bold"/>
          </InputAdornment>
        )
      }}
    >
      {/* <MenuItem value='0'>
        Selecione
      </MenuItem> */}
      {props.options?.map(option => {
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