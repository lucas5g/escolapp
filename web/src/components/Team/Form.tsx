import { FormEvent, useEffect, useState } from "react";
import { mutate } from "swr";
import { api } from "../../utils/axios";
import { Button } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";
import { GroupInterface, ModalityInterface, StudentInterface, TeamInterface } from "../../interfaces";
import { Row } from "../Row";
import { MultiSelect } from "../MultiSelect";
import { renameLowerCase } from "../../utils/rename-lowercase";


interface Props {
  team: TeamInterface
  setTeam: (team: TeamInterface) => void
  modalities: ModalityInterface[]
  groups: GroupInterface[]
  students: StudentInterface[]
}

const genres = [
  { id: 2, name: 'FEM' },
  { id: 1, name: 'MAS' },
  { id: 3, name: 'MISTO' },
]

export function Form({ team, setTeam, groups, modalities, students: studentsWithoutFilter }: Props) {


  const [loading, setLoading] = useState(false)
  const [studentsSelected, setStudentsSelected] = useState([] as string[])


  useEffect(() => {
    if(!team.id)return 

    const group = team.group
    const modality = modalities.find((modality: any) => modality.id === team.modality_id)
    const genre = team.genre
    const teamName = `${group} ${modality?.name ?? ''} ${genre}`.trim()
    setTeam({ ...team, name: teamName })

  }, [team.id, team.modality_id, team.genre, team.group])

  useEffect(() => {
    if (!team.students) {
      return setStudentsSelected([])
    }

    // setStudentsSelected(team.students
    //   // .filter(student => student.group === groups.find(group => group.id === team.group).)
    //   .map(student => student.ra)
    // )

  }, [team.id, team.group])

  const modality = modalities.find(modality => modality.id === team.modality_id)

  const students = studentsWithoutFilter.filter(student => {
    return student.group === team.group
    }).map(student => {
    return {
      id: student.ra,
      name: renameLowerCase(student.name)
    }
  })

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
          value={team.group ?? ''}
          onChange={event => setTeam({ ...team, group: event.target.value })}
        />
        <Row>
          <Input
            name='modalityId'
            label='Modalidade'
            options={modalities}
            value={team.modality_id ?? ''}
            onChange={event => setTeam({ ...team, modality_id: Number(event.target.value) })}
          />
          <Input
            name='genre_id'
            label='Gênero'
            options={genres}
            value={team.genre ?? ''}
            onChange={event => setTeam({ ...team, genre: event.target.value })}
            className="w-1/2"
          />
        </Row>
        <Input
          name="name"
          label="Nome da Equipe"
          value={team.name || ''}
          onChange={event => setTeam({ ...team, name: event.target.value })}
        />
        {students && team.group &&
          <MultiSelect
            label="Alunos"
            selected={studentsSelected}
            setSelected={setStudentsSelected}
            items={students}
            limit={modality?.membersQuantity}
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)

    const body = {
      name: team.name,
      group: team.group,
      modalityId: team.modality_id,
      genreId: team.genre,
      students: studentsSelected
    }
    // console.log('students => ', body.students)
    // console.log('students length => ', body.students.length)

    // return 
    try {
      if (team.id) {
        await api.put(`teams/${team.id}`, body)
      } else {
        const { data } = await api.post(`teams`, body)
        // setTeam(data)
        setTeam({} as TeamInterface)
      }
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

}