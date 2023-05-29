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
    // if (team.id) return
    const group = groups.find(group => group.id === team.groupId)

    const modality = modalities.find((modality: any) => modality.id === team.modalityId)

    const genre = genres.find((genre: any) => genre.id === team.genreId)
    const teamName = `${group?.name ?? ''} ${modality?.name ?? ''} ${genre?.name ?? ''}`.trim()
    setTeam({ ...team, name: teamName })

  }, [team.id, team.modalityId, team.genreId, team.groupId])

  // console.log(mo)
  useEffect(() => {
    if (!team.students) {
      return setStudentsSelected([])
    }

    // setStudentsSelected([])
    setStudentsSelected(team.students)

  }, [team.id])

  const modality = modalities.find(modality => modality.id === team.modalityId)
  
  const students = studentsWithoutFilter.filter(student => {
    const group = groups.find(group => group.id === team.groupId)
    return student.group === group?.name
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
          value={team.groupId ?? ''}
          onChange={event => setTeam({ ...team, groupId: Number(event.target.value) })}
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
            name='genreId'
            label='Gênero'
            options={genres}
            value={team.genreId ?? ''}
            onChange={event => setTeam({ ...team, genreId: Number(event.target.value) })}
            className="w-1/2"
          />
        </Row>
        <Input
          name="name"
          label="Nome da Equipe"
          value={team.name || ''}
          onChange={event => setTeam({ ...team, name: event.target.value })}
        />
        {students && team.groupId &&
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
      groupId: team.groupId,
      modalityId: team.modalityId,
      genreId: team.genreId,
      students: studentsSelected
    }

    try {
      if (team.id) {
        await api.put(`teams/${team.id}`, body)
      } else {
        const { data } = await api.post(`teams`, body)
        setTeam(data)
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