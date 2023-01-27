import { Form } from "@/components/Form";
import { useEffect, useState } from "react";

interface Login {
  email: string
  password: string
}

export default function Login() {

  const [access, setAccess] = useState({} as Login)
  const fields = [
    { key: 'email', value: 'Email' },
    { key: 'password', value: 'Senha' },

  ]

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50">

      <div className="w-1/3">
        <Form
          fields={fields}
          item={access}
          setItem={setAccess}
          uri='login'
          title='LOGIN'
          labelButton="ACESSAR"
        />
      </div>
    </div>
  )
}