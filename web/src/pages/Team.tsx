import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { Form } from "../components/Team/Form";
import { swr } from "../utils/swr";
import { GroupInterface, ModalityInterface, StudentInterface, TeamInterface } from "../interfaces";

const fields = [
  { key: 'name', value: 'Nome da Equipe', },
  { key: 'modality', value: 'Modalidade' },
  { key: 'group', value: 'Turma' },
]

export function Team() {

  const [team, setTeam] = useState({} as TeamInterface)

  const { data, error }:{data:TeamInterface[], error:any} = swr('teams')
  const { data: groups, error: errorGroups }: { data: GroupInterface[], error: any } = swr('groups')
  const { data: modalities, error: errorModalities }:{data:ModalityInterface[], error:any} = swr('modalities')
  const { data: students, error: errorStudents } = swr(`students`) as { data: StudentInterface[], error: any }


  if (error) return <Error error={error} />
  if (!data || !groups || !modalities || !students) return <Loading />

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
          groups={groups}
          modalities={modalities}
          students={students}
        />
      </Main>
    </Layout>
  )
}