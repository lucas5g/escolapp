import { useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

const fields = [
  { key: 'name', value: 'Nome da Equipe', },
  { key: 'modalityId', value: 'Modalidade' },
  { key: 'groupId', value: 'Turma' },
  { key: 'genreId', value: 'Gênero' }
]

const genres = [
  { id: 2, name: 'FEM' },
  { id: 1, name: 'MAS' },
  { id: 3, name: 'MISTO' },
]


export function Team() {


  const [team, setTeam] = useState({})

  const { data, error } = swr('teams')
  const { data: groups, error: errorGroups } = swr('groups')
  const { data: modalities, error: errorModalities } = swr('modalities')

  if (error || errorGroups) return <Error error={error} />
  if (!data || !groups) return <Loading />

  const fieldsForm = [
    { key: 'groupId', value: 'Turma', options: groups },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'genreId', value: 'Gênero', options: genres },
    { key: 'name', value: 'Nome da Equipe' },
  ]

  const teams = data



  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          item={team}
          items={teams}
          setItem={setTeam}
        />
        <Form
          fields={fieldsForm}
          item={team}
          setItem={setTeam}
          uri='teams'
        />
      </Main>
    </Layout>
  )
}