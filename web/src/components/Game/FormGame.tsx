import moment from "moment";
import { GameInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { MultiSelect } from "../MultiSelect";

interface Props {
  // places: PlaceInterface[]
  // modalities: ModalityInterface[]
  // users: UserInterface[]
  students: StudentInterface[]
  teams: TeamInterface[]
  game: GameInterface
  setGame: (game: GameInterface) => void
}

export function FormGame({ game, setGame, teams }: Props) {

  const [loading, setLoading] = useState(false)
  // const [teams, setTeams] = useState([] as TeamInterface[])

  // useEffect(() => {
  //   if (!game.teams) {
  //     setSelectedTeams([])
  //     return
  //   }
  //   setSelectedTeams(game.teams)
  // }, [game.id])

  // const teams = teamsWithoutFilter.filter(team => team.modalityId === game.modalityId)

  return (
    <Card width={80}>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <div className="text-sm">
          <strong>Horas</strong>: {game.hours} <br />
          <strong>Local</strong>: {game.place}

          <div>
            Equipes
            <ul>
              {game.teams?.map(team => {
                return (
                  <li>
                    {teams.find(row => row.id === team )?.name}
                  </li>
                )
              })}
            </ul>
          </div>

        </div>


        Dados dos jogos
        {/* <Input
          name='modalityId'
          label="Modalidade"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
          options={modalities}
          error={game.errors?.modalityId}

        /> */}

        {/* <MultiSelect
          label="Equipes"
          items={teams}
          selected={selectedTeams}
          setSelected={setSelectedTeams}
          columns={2}
          limit={modalities.find(modality => modality.id === game.modalityId)?.teamsQuantity}
        /> */}

        <div className="flex justify-end gap-3 ">
          <Button
            value='Atualizar'
            disabled={loading}
          />
          <Button
            value={'Cancelar'}
            secondary
            type="reset"
            onClick={() => setGame({} as GameInterface)}
          />
        </div>
      </form>
    </Card>
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    return console.log('sadf')
    setLoading(true)
    try {
      const body = {
        ...game,
        date: game.date ? new Date(game.date).toISOString() : undefined,
        teams: selectedTeams
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