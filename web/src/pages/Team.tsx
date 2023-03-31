import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
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

interface TeamInterface {
  id: number
  name: string
  groupId: number
  modalityId: number
  genreId: number
}

interface GroupInterface {
  id: number
  name: string
  codcur: number
  codper: number
}

interface StudentInterface {
  id: number
  name: string
}

export function Team() {

  const [team, setTeam] = useState({} as TeamInterface)
  const [group, setGroup] = useState({
    codcur: 22,
    codper: 1
  } as GroupInterface)
  const { data, error } = swr('teams')
  const { data: groups, error: errorGroups }: { data: GroupInterface[], error: any } = swr('groups')
  const { data: modalities, error: errorModalities } = swr('modalities')

  const { data: students, error: errorStudents } = swr(`students?codcur=${group.codcur}&codper=${group.codper}`) as { data: StudentInterface[], error: any }
  /**
   * Create name team by options
   */
  useEffect(() => {
    if (!groups || !modalities) return
    const group = groups.find(group => group.id === team.groupId)
    if (group?.id) {
      setGroup(group)
    }

    const modality = modalities.find((modality: any) => modality.id === team.modalityId)
    const genre = genres.find((genre: any) => genre.id === team.genreId)
    const teamName = `${group?.name ?? ''} ${modality?.name ?? ''} ${genre?.name ?? ''}`.trim()
    setTeam({ ...team, name: teamName })

  }, [team.groupId, team.modalityId, team.genreId])

  if (error || errorGroups) return <Error error={error} />
  if (!data || !groups || !groups || !modalities) return <Loading />

  console.log(team)
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
          item={team}
          setItem={setTeam}
          uri='teams'
          width={90}
        >
          <Input
            name='groupId'
            label='Turma'
            options={groups}
            value={team.groupId ?? ''}
            onChange={event => setTeam({ ...team, groupId: Number(event.target.value) })}
          />
          <Input
            name='modalityId'
            label='Modalidade'
            options={modalities}
            value={team.modalityId ?? ''}
            onChange={event => setTeam({ ...team, modalityId: Number(event.target.value) })}
          />
          <Input
            name='genreId'
            label='Gênero'
            options={genres}
            value={team.genreId ?? ''}
            onChange={event => setTeam({ ...team, genreId: Number(event.target.value) })}
          />
          <TextField
            id="name"
            name="name"
            label="Nome da Equipe"
            value={team.name ?? ''}
            onChange={event => setTeam({ ...team, name: event.target.value })}
          />
          {students && students?.length > 0 &&
            <Autocomplete
              multiple
              id='students'
              options={students?.map(student => student?.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Alunos'
                  placeholder="Adicionar Aluno"
                />
              )}
            />
          }
        </Form>
      </Main>
    </Layout>
  )
}