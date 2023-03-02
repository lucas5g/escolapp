import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
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

interface Team {
  id: number
  name: string
  groupId: number
  modalityId: number
  genreId: number
}

export function Team() {

  const [team, setTeam] = useState({} as Team)

  const { data, error } = swr('teams')
  const { data: groups, error: errorGroups } = swr('groups')
  const { data: modalities, error: errorModalities } = swr('modalities')

  /**
   * Create name team by options
   */
  useEffect(() => {
    if(!groups || !modalities ) return
    const group = groups.find((group: any) => group.id === team.groupId) 
    const modality = modalities.find((modality: any) => modality.id === team.modalityId)
    const genre = genres.find((genre: any) => genre.id === team.genreId)
    const teamName = `${group?.name ?? ''} ${modality?.name ?? ''} ${genre?.name ?? ''}`.trim()
    setTeam({...team, name:teamName})

  }, [team.groupId, team.modalityId, team.genreId])

  if (error || errorGroups) return <Error error={error} />
  if (!data || !groups || !groups || !modalities) return <Loading />

  const fieldsForm = [
    { key: 'groupId', value: 'Turma', options: groups },
    { key: 'modalityId', value: 'Modalidade', options: modalities },
    { key: 'genreId', value: 'Gênero', options: genres },
    // { key: 'name', value: 'Nome da Equipe' },
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
          positionBottom={teams.length * 100}
        />
        <Form
          fields={fieldsForm}
          item={team}
          setItem={setTeam}
          uri='teams'
        >
          <TextField
            id="name"
            name="name"
            label="Nome da Equipe"
            value={team.name ?? ''}
            onChange={event => setTeam({ ...team, name: event.target.value })}
          />
        </Form>
      </Main>
    </Layout>
  )
}