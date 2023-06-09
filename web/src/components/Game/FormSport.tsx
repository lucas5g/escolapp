import { GameInterface, TeamInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { Main } from "../Main";
import { renameLowerCase } from "../../utils/rename-lowercase";
import { TextareaAutosize } from "@mui/material";
import { te } from "date-fns/locale";

interface Props {
  game: GameInterface
  setGame: (game: GameInterface) => void
  openForm: boolean
  setOpenForm: (openForm: boolean) => void
}

export function FormSport({ game, setGame, openForm, setOpenForm }: Props) {

  const [loading, setLoading] = useState(false)
  const [maxGoals, setMaxGoals] = useState(0)

  useEffect(() => {

  })

  if (!openForm) return <></>
  // console.log(game.teams[0].goals)
  return (
    <Main position="col">
      <Card>
        <div className="text-sm">
          {game.datetime} | {game.user.name} | {game.teams.length} Euipes
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
                  label={`GOLS ${team.name}`}
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
                  disabled={true}
                  value={team.points ?? ''}
                // onChange={event => changeInput(team.id, 'goals', event.target.value)}

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


  function changeInput(teamId: number, value: number) {
    const teamsGoals = game.teams.map(team => {

      if (team.id === teamId) {
        team.goals = Number(value)
        return team
      }
      return team
    })

    let maxGoals = 0
    teamsGoals.forEach(team => {
      if (team.goals > maxGoals) {
        maxGoals = Number(team.goals)
      }
    })
    const teams = teamsGoals.map((team, i) => {

      console.log({ team: team.name, goals: team.goals, maxGoals })

      if (team.goals === maxGoals) {
        team.points = 3
      }else{
        team.points = 1
      }


      return team


    })
    // for (let j = 0; j < teams.length; j++) {
    //   if (let i !== j && teams[i].goals === teams[j].goals) {
    //     teams[i].points = 2;
    //     teams[j].points = 2;
    //   }
    // }
    
    

    setGame({ ...game, teams })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      const body = {
        comments: game.comments,
        teams: game.teams.map(team => {
          return {
            id: team.id,
            goals: team.goals,
            points: team.points
          }
        })
      }
      console.log('comments => ', body.comments)
      console.log('teams => ', body.teams)

      return
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