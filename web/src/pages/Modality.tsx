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
    { key: 'type', value: 'Tipo', options:[
      {id:'collective', name:'Coletivo'},
      {id: 'individual', name: 'Individual'},
      {id: 'participative', name: 'Participativo'},
      {id: 'ranking', name: 'Ranking'},
    ]},
    { key: 'membersQuantity', value: 'Qtd. Membros', type:'number' },
    { key: 'teamsQuantity', value: 'Qtd. Equipes', type:'number' }
  ]
  localStorage.setItem('uri', 'modalities')
  const [modality, setModality] = useState({})
  const { data, error } = swr('modalities')

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const modalities = data

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={modalities}
          item={modality}
          setItem={setModality}
          positionBottom={modalities.length * 100}
          deleteItem
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