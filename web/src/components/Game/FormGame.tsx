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
  game: GameInterface
  setGame: (game: GameInterface) => void
}

export function FormGame({ game, setGame }: Props) {

  const [loading, setLoading] = useState(false)
  console.log(game)

  if (!game.id) return <></>

  return (
    <Card >
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3">
          {game.teamsStudents.map((team, i) => {
            return (
              <Input
                key={i}
                name='test'
                label={`GOLS ${team.name}`}
                type="number"
              />
            )
          })}
        </div>
        {/* <Input
          name='modalityId'
          label="Pontos"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
          error={game.errors?.modalityId}

        />
         <Input
          name='modalityId'
          label="Pontos"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
          error={game.errors?.modalityId}

        />
         <Input
          name='modalityId'
          label="Pontos"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
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