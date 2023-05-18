import { Autocomplete, TextField } from "@mui/material";
import { Student } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { mutate } from "swr";
import { TeamInterface } from "../../pages/Team";
import { api } from "../../utils/axios";
import { swr } from "../../utils/swr";
import { Button } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";

interface GroupInterface {
  id: number
  name: string
  codcur: number
  codper: number

}
interface StudentInterface {
  id: number
  name: string
  ra: string
  codcur: number
  codper: number
}

interface Props {
  team: TeamInterface
  setTeam: (team: TeamInterface) => void
}

const genres = [
  { id: 2, name: 'FEM' },
  { id: 1, name: 'MAS' },
  { id: 3, name: 'MISTO' },
]

export function Form({ team, setTeam }: Props) {


  const [loading, setLoading] = useState(false)

  const { data: groups, error: errorGroups }: { data: GroupInterface[], error: any } = swr('groups')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: students, error: errorStudents } = swr(`students`) as { data: StudentInterface[], error: any }

  useEffect(() => {
    if (!groups || !modalities) return
    if (team.id) return
    const group = groups.find(group => group.id === team.groupId)
    // if (group?.id) {
    //   setGroup(group)
    // }

    const modality = modalities.find((modality: any) => modality.id === team.modalityId)
    const genre = genres.find((genre: any) => genre.id === team.genreId)
    const teamName = `${group?.name ?? ''} ${modality?.name ?? ''} ${genre?.name ?? ''}`.trim()
    setTeam({ ...team, name: teamName })

  }, [team.id, team.modalityId, team.genreId])

  return (
    <Card>
      <form
        onSubmit={team.id ? handleSubmitUpdate : handleSubmitCreate}
        className="flex flex-col gap-5"
      >
        {/* {team.id} */}
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
        <Input
          name="name"
          label="Nome da Equipe"
          value={team.name || ''}
          onChange={event => setTeam({ ...team, name: event.target.value })}
        />
        {/* {console.log(team, groups)} */}
        {students?.length > 0 && team.groupId &&
          <Autocomplete
            multiple
            id='students'
            options={
              students
                .filter(student => student.codcur === groups.find(group => group.id === team.groupId)?.codcur)
                .filter(student => student.codper === groups.find(group => group.id === team.groupId)?.codper)
                .map(student => student?.name)
            }
            onChange={(event, names) => {
              console.log({ names })
              setTeam({ ...team, students: names })
            }}
            value={team.students ?? []}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label='Alunos'
                placeholder="Clique para adicionar"
              />
            )}
          />
        }
        <div className="flex gap-3 justify-end">
          <Button
            value={team.id ? 'Atualizar' : 'Cadastrar'}
            disabled={loading}
          />
          <Button
            value='Cancelar'
            type='reset'
            secondary
            onClick={() => {
              setTeam({} as TeamInterface)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}

          />
        </div>
      </form>
    </Card>
  )

  async function handleSubmitCreate(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const studentsSelected = team?.students?.map(name => {
      return students.find(student => student.name === name)?.id || ''
    })
    const data = {
      name: team.name,
      groupId: team.groupId,
      modalityId: team.modalityId,
      genreId: team.genreId,
      studentsSelected
    }

    try {
      await api.post(`teams`, data)
      mutate('teams')
    } catch (error: any) {
      console.log(error)
      const { data } = error.response
      if (data) {
        alert(data.message)
        return
      }
      alert('Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmitUpdate(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const studentsSelected = team.students.map(name => {
      return students.find(student => student.name === name)?.id || ''
    })
    const data = {
      name: team.name,
      groupId: team.groupId,
      modalityId: team.modalityId,
      genreId: team.genreId,
      studentsSelected
    }

    try {
      await api.put(`teams/${team.id}`, data)
      mutate('teams')
    } catch (error) {
      console.log(error)
      alert('Erro ao atualizar')
    } finally {
      setLoading(false)
    }
  }
}