import { ChangeInputInterface, GameInterface } from "../../interfaces";
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
  return (
    <Main position="col">
      <Card>
        <div className="text-sm">
          {game.datetime} | {game.user.name} | {game.teams.length} Equipes
        </div>
        <div className="grid grid-cols-2 text-sm gap-2 mt-5">
          {game.teams?.map(team => {
            return (
              <div key={team.id} className="space-y-1">
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
          {/* new feature */}
          <div className="text-sm flex flex-col gap-4">
            {game.teams.map((team, i) => {
              return (
                <div key={team.id} className="space-y-3">
                  <strong>
                    {team.name}
                  </strong>
                  <div className="flex gap-1">
                    <Input
                      name={`teamGoals${team.id}`}
                      label={`Placar`}
                      type='number'
                      value={team.goals ?? ''}
                      onChange={event => changeInput({
                        field: 'goals',
                        teamId: team.id,
                        value: Number(event.target.value)
                      })}

                    />
                    <Input
                      name={`teamFairPlay`}
                      label="FairPlay"
                      value={team.fairPlay ?? ''}
                      onChange={event => changeInput({
                        teamId: team.id,
                        field: 'fairPlay',
                        value: Number(event.target.value)
                      })}
                      options={[
                        { id: 0, name: 'Não' },
                        { id: 1, name: 'Sim' }
                      ]}
                    />
                    <Input
                      name={`teamPoints${team.id}`}
                      label={`Pontos`}
                      type="number"
                      disabled={logged.profile === 'judge' ? true : false}
                      value={team.points ?? ''}
                      onChange={event => changeInput(
                        { field: 'points', teamId: team.id, value: Number(event.target.value) }
                      )}

                    />
                  </div>
                </div>
              )
            })}
          </div>

          <TextareaAutosize
            placeholder="Comentários"
            className="bg-zinc-100 rounded p-2 focus:border-blue-500"
            minRows={3}
            value={game.comments ?? ''}
            onChange={event => setGame({ ...game, comments: event.target.value })}
            required={game.teams.find(team => team.points > 3) && true}
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


  function changeInput({ field, teamId, value }: ChangeInputInterface) {
    const teams = game.teams.map(team => {
      if (teamId !== team.id) {
        return team
      }
      if (field === 'fairPlay') {
        team.fairPlay = value
        team.points = value === 1 ? team.points + 1 : team.points - 1
        return team
      }

      team[field] = value === 0 ? undefined : value
      return team
    })

    if (value === '' || field === 'fairPlay' || field === 'points') {
      return setGame({ ...game, teams })
    }

    let maxGoals = 0
    let maxGoalsCount = 0


    for (const team of teams) {

      if (team.goals && team.goals > maxGoals) {
        maxGoals = team.goals
      }
    }

    if (game.modality.type === 'individual') {

      for (const team of teams) {
        if (team.goals === maxGoals) {
          team.points = team.fairPlay === 1 ? 3 : 2
        } else {
          team.points = team.fairPlay === 1 ? 2 : 1
        }
      }

      for (const team of teams) {
        if (team.goals === maxGoals) {
          maxGoalsCount++
        }
      }

      if (maxGoalsCount > 1) {
        for (const team of teams) {
          if (team.goals === maxGoals) {
            team.points = 1
          }
        }
      }
      return setGame({ ...game, teams })
    }

    for (const team of teams) {

      if (team.goals === maxGoals) {

        team.points = team.fairPlay === 1 ? 4 : 3
      } else {
        team.points = team.fairPlay === 1 ? 2 : 1
      }
    }

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
            fairPlay: team.fairPlay,
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