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
import { storageLogged } from "../../utils/storage-logged";


interface Props {
  team: TeamInterface
  setTeam: (team: TeamInterface) => void
  modalities: ModalityInterface[]
  groups: GroupInterface[]
  students: StudentInterface[]
}

const genres = [
  { id: 'fem', name: 'FEM' },
  { id: 'mas', name: 'MAS' },
  { id: 'misto', name: 'MISTO' },
]

export function Form({ team, setTeam, groups, modalities, students: studentsWithoutFilter }: Props) {


  const [loading, setLoading] = useState(false)
  const [studentsSelected, setStudentsSelected] = useState([] as string[])


  useEffect(() => {

    const group = team.group
    const modality = modalities.find((modality: any) => modality.id === team.modalityId)
    const genre = team.genre
    const teamName = `${group ?? ''} ${modality?.name ?? ''} ${genre ?? ''}`.trim()
    setTeam({ ...team, name: teamName })

  }, [team.id, team.modalityId, team.genre, team.group])

  useEffect(() => {
    if (!team.students) {
      return setStudentsSelected([])
    }

    const students = studentsWithoutFilter.filter(student => student.group === team.group)

    const studentsGroup = team.students.filter(student => {
      return students.some(row => row.ra === student)
    })

    setStudentsSelected(studentsGroup)

  }, [team.id, team.group])

  const modality = modalities.find(modality => modality.id === team.modalityId)

  const students = studentsWithoutFilter.filter(student => {
    return student.group === team.group
  }).map(student => {
    return {
      id: student.ra,
      name: renameLowerCase(student.name),
      group: student.group
    }
  })

  console.log('students => ', students)
  console.log('studentsSelected => ', studentsSelected)

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <Input
          name='group'
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
            value={team.modalityId ?? ''}
            onChange={event => setTeam({ ...team, modalityId: Number(event.target.value) })}
          />
          <Input
            name='genre'
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
      modalityId: team.modalityId,
      genre: team.genre,
      students: studentsSelected,
      unityId: storageLogged()?.unityId
    }

    try {
      if (team.id) {
        await api.patch(`teams/${team.id}`, body)
      } else {
        await api.post('teams', body)
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