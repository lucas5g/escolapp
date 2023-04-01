import { Autocomplete, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { TeamInterface } from "../../pages/Team";
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
}

interface Props {
  team: TeamInterface
  setTeam:(team:TeamInterface) => void
}

const genres = [
  { id: 2, name: 'FEM' },
  { id: 1, name: 'MAS' },
  { id: 3, name: 'MISTO' },
]

export function Form({ team, setTeam }: Props) {

  const [group, setGroup] = useState({
    codcur: 22,
    codper: 1
  } as GroupInterface)

  const { data: groups, error: errorGroups }: { data: GroupInterface[], error: any } = swr('groups')
  const { data: modalities, error: errorModalities } = swr('modalities')

  const { data: students, error: errorStudents } = swr(`students?codcur=${group.codcur}&codper=${group.codper}`) as { data: StudentInterface[], error: any }
  
  useEffect(() => {
    setTeam({...team, studentsSelected:[]})
    // console.log('muda')
  }, [team.groupId])

  // console.log(team)

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

  }, [team.id, team.modalityId, team.genreId])

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
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
        <Input
          name="name"
          label="Nome da Equipe"
          value={team.name || ''}
          onChange={event => setTeam({ ...team, name: event.target.value })}
        />
        {students && students?.length > 0 &&
          <Autocomplete
            multiple
            id='students'
            options={students?.map(student => student?.name)}
            onChange={(event, names) => { 
              setTeam({ ...team, studentsSelected: names })
            }}

            value={team.studentsSelected ?? []}
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
          <Button value='Cadastrar' />
          <Button
            value='Cancelar'
            type='reset'
            secondary
            onClick={() => {
              setTeam({} as TeamInterface)
              // window.scrollTo({ top: 0, behavior: 'smooth' })
            }}

          />
        </div>
      </form>
    </Card>
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const studentsRaSelected = team.studentsSelected.map( name => {
      return students.find(student => student.name === name)?.ra || ''
    })
    console.log({...team, studentsRaSelected})
  }
}