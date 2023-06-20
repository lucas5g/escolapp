import { GameInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { Main } from "../Main";
import { renameLowerCase } from "../../utils/rename-lowercase";
import { TextareaAutosize } from "@mui/material";
import { storageLogged } from "../../utils/storage-logged";

interface Props {
  game: GameInterface
  setGame: (game: GameInterface) => void
  openForm: boolean
  setOpenForm: (openForm: boolean) => void
}

export function FormSport({ game, setGame, openForm, setOpenForm }: Props) {

  const [loading, setLoading] = useState(false)
  const logged = storageLogged()

  if (!openForm) return <></>
  // console.log(game.teams[0].goals)
  return (
    <Main position="col">
      <Card>
        <div className="text-sm">
          {game.datetime} | {game.user.name} | {game.teams.length} Equipes
        </div>
        <div className="grid grid-cols-2 text-sm gap-2 mt-5">
          {game.teams?.map(team => {
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
            {game?.teams?.map((team, i) => {
              return (
                <Input
                  key={team.id}
                  name={`teamGoals_${team.id}`}
                  label={`PLACAR ${team.name}`}
                  type="number"
                  value={team.goals ?? ''}
                  onChange={event => changeInput(team.id, event.target.value)}
                />
              )
            })}
          </div>
          <div className="flex flex-col gap-3">
            {game.teams?.map(team => {
              return (
                <Input
                  key={team.id}
                  name={`teamPoints_${team.id}`}
                  label={`PONTOS ${team.name}`}
                  type="number"
                  disabled={logged.profile === 'judge' ? true : false}
                  value={team.points ?? ''}
                  onChange={event => changeInputPoints(team.id, event.target.value)}

                />
              )
            })}
          </div>
          <TextareaAutosize
            placeholder="Comentários"
            className="bg-zinc-100 rounded p-2 focus:border-blue-500"
            minRows={3}
            value={game.comments ?? ''}
            onChange={event => setGame({ ...game, comments: event.target.value })}
          />

          <div className="flex justify-end gap-3 ">
            <Button
              value='Atualizar'
              disabled={loading}
            />
            <Button
              value={'Cancelar'}
              secondary
              type="reset"
              onClick={() => { setGame({} as GameInterface), setOpenForm(false) }}
            />
          </div>
        </form>
      </Card>
    </Main>
  )

  function changeInputPoints(teamId: number, value: number) {
    const teams = game.teams.map(team => {
      if(teamId === team.id){
        team.points = Number(value) 
        return team 
      }
      return team
    })

    setGame({...game, teams})
  }
  function changeInput(teamId: number, value: string) {

    const teams = game.teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          // goals: Number(value)
          goals: Number(value) === 0 ? undefined : Number(value )
        }
      }
      return team
    })
    if(value === ''){
      return setGame({ ...game, teams })
    }

    let maxGoals = 0
    for (const team of teams) {

      if (team.goals && team.goals > maxGoals) {
        maxGoals = team.goals
      }
    }

    for (const team of teams) {

      if (team.goals === maxGoals) {
        team.points = 3
      } else {
        team.points = 1
      }
    }

    let maxGoalsCount = 0
    for (const team of teams) {
      if (team.goals === maxGoals) {
        maxGoalsCount++
      }
    }

    if (maxGoalsCount > 1) {
      for (const team of teams) {
        if (team.goals === maxGoals) {
          team.points = 2
        }
      }
    }

    setGame({ ...game, teams })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      const body = {
        ...game,
        teams: game.teams.map(team => {
          return {
            id: team.id,
            goals: team.goals ?? 0,
            points: team.points
          }
        })
      }
      
      await api.put(`games/${game.id}`, body)

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