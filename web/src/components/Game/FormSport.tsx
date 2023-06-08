import { GameInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { Main } from "../Main";
import { renameLowerCase } from "../../utils/rename-lowercase";

interface Props {
  game: GameInterface
  setGame: (game: GameInterface) => void
  openForm: boolean
  setOpenForm: (openForm:boolean) => void
}

export function FormSport({ game, setGame, openForm, setOpenForm }: Props) {

  const [loading, setLoading] = useState(false)

  if (!openForm ) return <></>

  return (
    <Main position="col">
      <Card>
        <div className="text-sm">
          {game.datetime} | {game.user.name} | {game.teams.length} Equipes
        </div>
        <div className="grid grid-cols-2 text-sm gap-2 mt-5">
          {game.teamsStudents?.map(team => {
            return (
              <div key={team.id}>
                <strong>{team.name}</strong>
                <ul className="flex flex-col gap-1">
                  {team.students.map(student => {
                    return (
                      <li key={student.ra} className="border rounded pl-1 py-1">
                        {renameLowerCase(student.name, 33)}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div> 
      </Card>
      <Card>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            {game?.teamsStudents?.map(team => {
              return (
                <Input
                  key={team.id}
                  name='test'
                  label={`GOLS ${team.name}`}
                  type="number"
                />
              )
            })}
          </div>
          <div className="flex flex-col gap-3">
            {game.teamsStudents?.map(team => {
              return (
                <Input
                  key={team.id}
                  name="test2"
                  label={`PONTOS ${team.name}`}
                  type="number"
                  disabled={true}
                />
              )
            })}
          </div>
          <div className="flex justify-end gap-3 ">
            <Button
              value='Atualizar'
              disabled={loading}
            />
            <Button
              value={'Cancelar'}
              secondary
              type="reset"
              onClick={() => {setGame({} as GameInterface), setOpenForm(false)} }
            />
          </div>
        </form>
      </Card>
    </Main>
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    return console.log('sadf')
    setLoading(true)
    try {
      const body = {
        ...game,
        date: game.date ? new Date(game.date).toISOString() : undefined,
        // teams: 
      }

      if (game.id) {
        await api.put(`games/${game.id}`, body)
      } else {
        const { data } = await api.post('games', body)
        setGame(data)
      }
      mutate('games')

    } catch (error: any) {

      if (error.response.data.errors === 400) {
        return setGame({ ...game, errors: error.response.data.errors })
      }
      alert('Erro no servidor.')
    } finally {
      setLoading(false)
    }
  }
}