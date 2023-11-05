import { useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Form } from "../components/Form";

const fields = [
  { key: 'email', value: 'E-mail' },
  { key: 'profile', value: 'Perfil' },
]

const options = [
  {id: 'admin', name: 'Admin'},
  { id: 'coordinator', name: 'Coordenador' },
  { id: 'manager', name: 'Gerente' },
  { id: 'judge', name: 'Mediador' },
  { id: 'teacher', name: 'Professor' },
  { id: 'representative', name: 'Representante' },

]

const fieldsForm = [
  { key: 'email', value: 'E-mail', type: 'email' },
  { key: 'password', value: 'Senha', type: 'password' },
  {
    key: 'profile',
    value: 'Perfil',
    options
  },

]
interface UserInterface {
  id: number
  name: string
}

export function User() {

  const [user, setUser] = useState({} as UserInterface)
  const uri = 'users'
  const { data: users, error }: { data: UserInterface[], error: any } = swr(uri)
  if (error) return <Error error={error} />
  if (!users) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={users}
          item={user}
          setItem={setUser}
          positionBottom={users.length * 100}

        />
        <Form
          fields={fieldsForm}
          item={user}
          setItem={setUser}
          uri={uri}
          width={80}
        />
      </Main>
    </Layout>
  )
}