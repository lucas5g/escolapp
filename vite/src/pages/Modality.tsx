import { useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

export function Modality() {

  const fields = [
    { key: 'name', value: 'Nome da Modalidade', },
    { key: 'membersQuantity', value: 'Qtd. Membros' },
    { key: 'teamsQuantity', value: 'Qtd. Equipes' }
  ]

  fields.map(row => console.log(row.value))

  const [modality, setModality] = useState({})
  const { data, error } = swr('modalities')

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const modalities = data

  return (
    <Layout>
      <Main>
        <Table
          heads={fields.map(head => head.value)}
          items={modalities}
          item={modality}
          setItem={setModality}
        />
        <Form
          fields={fields}
          item={modality}
          setItem={setModality}
          uri='modalities'
        />

      </Main>
    </Layout>
  )
}