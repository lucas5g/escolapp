import { useEffect, useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { Form } from "../components/Team/Form";
import { swr } from "../utils/swr";

const fields = [
  { key: 'name', value: 'Nome da Equipe', },
  { key: 'modalityId', value: 'Modalidade' },
  { key: 'groupId', value: 'Turma' },
  { key: 'genreId', value: 'Gênero' }
]

export interface TeamInterface {
  id: number
  name: string
  groupId: number
  modalityId: number
  genreId: number
  students: string[]
  group:{
    id:number,
    name:string,
    codcur:number,
    codper:number
  }
}

export function Team() {

  const [team, setTeam] = useState({} as TeamInterface)

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
          positionBottom={teams.length * 100}
        />
        <Form
          team={team}
          setTeam={setTeam}

        />
      </Main>
    </Layout>
  )
}