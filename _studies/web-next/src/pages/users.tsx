import { Error } from "@/components/Error"
import { Form } from "@/components/Form"
import { Layout } from "@/components/Layout"
import { Loading } from "@/components/Loading"
import { Table } from "@/components/Table"
import { Title } from "@/components/Title"
import { useFetch } from "@/utils/useFetch"
import { useState } from "react"
import { filter } from "../utils"

interface User {
  name: string 

}

export default function User() {
  const { data, error } = useFetch('/users')
  const [user, setUser] = useState({} as User)
  const [search, setSearch] = useState('')

  const fields = [
    {key: 'name', value: 'Nome'}
  ]

  const fieldsForm = [
    {key: 'name', value: 'Nome do Local'},
  ]

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const users = filter(data, search)

  return (
    <Layout>
      <Title title="Usuários" />
      {/* {/* <div className="container"> */}
        <Table
          fields={fields}
          items={users}
          setItem={setUser}
          search={search}
          setSearch={setSearch}
        />
        {/* <Form
          fields={fieldsForm}
          item={place}
          setItem={setPlace}
          uri='/places'
        /> */}
      {/* </div> */} 
    </Layout>
  )
}