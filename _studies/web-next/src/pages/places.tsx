import { Error } from "@/components/Error"
import { Form } from "@/components/Form"
import { Layout } from "@/components/Layout"
import { Loading } from "@/components/Loading"
import { Table } from "@/components/Table"
import { Title } from "@/components/Title"
import { useFetch } from "@/utils/useFetch"
import { useState } from "react"
import { filter } from "../utils"

interface Place {

}

export default function Place() {
  const { data, error } = useFetch('/places')
  const [place, setPlace] = useState({} as Place)
  const [search, setSearch] = useState('')

  const fields = [
    {key: 'name', value: 'Nome'}
  ]

  const fieldsForm = [
    {key: 'name', value: 'Nome do Local'},
  ]

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const places = filter(data, search)

  return (
    <Layout>
      <Title title="Locais" />
      <div className="container">
        <Table
          fields={fields}
          items={places}
          setItem={setPlace}
          search={search}
          setSearch={setSearch}
        />
        <Form
          fields={fieldsForm}
          item={place}
          setItem={setPlace}
          uri='/places'
        />
      </div>
    </Layout>
  )
}