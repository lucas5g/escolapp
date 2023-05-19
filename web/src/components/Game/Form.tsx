import moment from "moment";
import { GameInterface, ModalityInterface, PlaceInterface, TeamInterface, UserInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { sleep } from "../../utils/sleep";

interface Props {
  places: PlaceInterface[]
  modalities: ModalityInterface[]
  users: UserInterface[]
  teams: TeamInterface[]
  game: GameInterface
  setGame: (game: GameInterface) => void
}

export function Form({ places, modalities, users, teams: teamsWithoutFilter, game, setGame }: Props) {

  const [loading, setLoading] = useState(false)
  const [teams, setTeams] = useState([] as TeamInterface[])

  useEffect(() => {
    // setGame({ ...game, teams: [] })
    const teamsFilter = teamsWithoutFilter.filter(team => team.modalityId === game.modalityId)
    setTeams(teamsFilter)
  }, [game.modalityId])

  return (
    <Card>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >

        <Input
          type="date"
          name="date"
          label="Date"
          value={game.date ? moment(game.date).format('YYYY-MM-DD') : ''}
          onChange={event => setGame({ ...game, date: event.target.value })}
          inputLabelOpen
          error={game.errors?.date}
        />

        <div className="flex gap-3">
          <Input
            type='time'
            name="startHours"
            label='Início'
            onChange={ event => setGame({...game, startHours: event.target.value})}
            value={game.startHours ?? ''}
            inputLabelOpen
            error={game.errors?.startHours}

          />
          <Input
            type='time'
            name="endHours"
            label='Fim'
            onChange={ event => setGame({...game, endHours: event.target.value})}
            value={game.endHours ?? ''}
            inputLabelOpen
            error={game.errors?.endHours}

          />
        </div>
        <Input
          name='userId'
          label="Juíz"
          value={game.userId ?? ''}
          onChange={event => setGame({ ...game, userId: event.target.value })}
          options={users}
          error={game.errors?.userId}

        />
        <Input
          name='placeId'
          label="Local"
          value={game.placeId ?? ''}
          onChange={event => setGame({ ...game, placeId: event.target.value })}
          options={places}
          error={game.errors?.placeId}

        />
        <Input
          name='modalityId'
          label="Modalidade"
          value={game.modalityId ?? ''}
          onChange={event => setGame({ ...game, modalityId: event.target.value })}
          options={modalities}
          error={game.errors?.modalityId}

        />

        {teams.length > 0 &&
          <Autocomplete
            multiple
            id="teams"
            options={teams}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            onChange={(event, value) => setGame({ ...game, teams: value })}
            value={game.teams ?? []}
            isOptionEqualToValue={(option, data) =>
              option.name === data.name
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Equipes"
                placeholder="Clique para adicionar"
                error={game.errors?.teams ? true : false}
                helperText={game.errors?.teams ?? ''}
              />
            )}
          />
        }
        <div className="flex justify-end gap-3 ">
          <Button
            value={game.id ? 'Atualizar' : 'Cadastrar'}
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
    setLoading(true)
    try {
      const body = {
        ...game,
        date: game.date ? new Date(game.date).toISOString() : undefined,
        teams: game.teams.map(team => team.id)
      }
      // await sleep(200)
      if(game.id){
        await api.put(`games/${game.id}`, body)
      }else{
        const { data } = await api.post('games', body)
        setGame({...game, id: data.id})
      }
      mutate('games')

    } catch (error: any) {
      if(error.response.status === 400){
        // console.log(error.response.data)
        return setGame({...game, errors:error.response.data.errors})
      }
      alert(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
}