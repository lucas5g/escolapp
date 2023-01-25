import { useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

export function Team() {
  const fields = [
    { key: 'name', value: 'Nome da Equipe', },
    { key: 'modalityId', value: 'Modalidade' },
    { key: 'groupId', value: 'Turma' },
    { key: 'genreId', value: 'Gênero'}
  ]

  const [team, setTeam] = useState({})
  const { data, error } = swr('teams')

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const teams = data

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          item={team}
          items={teams}
          setItem={setTeam}
          width={55}
        />
        <Form
          fields={fields}
          item={team}
          setItem={setTeam}
          uri='teams'
          width={45}
        />

      </Main>
    </Layout>
  )
}