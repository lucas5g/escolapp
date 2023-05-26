import { FormEvent, useEffect, useState } from "react";
import { mutate } from "swr";
import { TeamInterface } from "../../pages/Team";
import { api } from "../../utils/axios";
import { swr } from "../../utils/swr";
import { Button } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";
import { renameLowerCase } from "../../utils/rename-lowercase";
import { GroupInterface, StudentInterface } from "../../interfaces";
import clsx from "clsx";


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
  const [studentsSelected, setStudentsSelected] = useState([] as string[])

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

  }, [team.id, team.modalityId, team.genreId, team.groupId])

  console.log(studentsSelected)

  return (
    <Card>
      <form
        onSubmit={team.id ? handleSubmitUpdate : handleSubmitCreate}
        className="flex flex-col gap-5"
      >
        <Input
          name='groupId'
          label='Turma'
          options={groups}
          value={team.groupId ?? ''}
          onChange={event => setTeam({ ...team, groupId: Number(event.target.value) })}
        />
        {/* <Input
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
        /> */}
        {/* <Input
          name="name"
          label="Nome da Equipe"
          value={team.name || ''}
          onChange={event => setTeam({ ...team, name: event.target.value })}
        /> */}
        {students && team.groupId &&

          <div className="flex flex-col">
            <label className="pl-1 py-2 border-b w-full text-sm">
              Clique nos Alunos
            </label>
            <ul className="text-sm grid grid-cols-3">
              {students.filter(student => {
                const group = groups.find(group => group.id === team.groupId)

                return (
                  student.codcur === group?.codcur &&
                  student.codper === group.codper
                )
              })
                .map(student => {
                  const studentExist = studentsSelected.find(res => res === student.ra)
                  return (
                    <li
                      key={student.ra}
                      className={clsx('border-b py-2 pl-4 cursor-pointer hover:bg-zinc-100 hover:rounded', {
                        'bg-blue-200 hover:bg-blue-200': studentExist
                      })} 
                  
                      onClick={() => {
                        if (!studentExist) {
                          return setStudentsSelected([...studentsSelected, student.ra])
                        }
                        const studentsFilter = studentsSelected.filter(res => res !== student.ra)
                        return setStudentsSelected(studentsFilter)

                      }}
                      title={student.name}
                    >

                      {renameLowerCase(student.name)}
                    </li>
                  )
                })}
            </ul>
          </div>
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
      return students.find(student => student.name === name)?.ra || ''
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
 
    const data = {
      name: team.name,
      groupId: team.groupId,
      modalityId: team.modalityId,
      genreId: team.genreId,
      students:studentsSelected
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