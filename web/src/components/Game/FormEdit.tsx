import moment from "moment";
import { GameInterface, ModalityInterface, PlaceInterface, TeamInterface, UserInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/axios";
import { mutate } from "swr";
import { MultiSelect } from "../MultiSelect";
import { storageLogged } from "../../utils/storage-logged";

interface Props {
  places: PlaceInterface[]
  modalities: ModalityInterface[]
  users: UserInterface[]
  teams: TeamInterface[]
  game: GameInterface
  setGame: (game: GameInterface) => void
  openForm: boolean | undefined 
  setOpenForm: (openForm:boolean) => void
}

export function FormEdit({ places, modalities, users, teams: teamsWithoutFilter, game, setGame, openForm, setOpenForm }: Props) {

  const [loading, setLoading] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState([] as number[])

  useEffect(() => {
    if (!game.teams) {
      setSelectedTeams([])
      return
    }
    setSelectedTeams(game.teams
      .filter(team => team.modality_id === game.modalityId)
      .map(team => team.id)
    )
  }, [game?.id, game.modalityId])

  if (!openForm) return <></>

  const teams = teamsWithoutFilter.filter(team => team.modalityId === game?.modalityId)
  return (
    <Card>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
      >

        <Input
          type="date"
          name="date"
          label="Data"
          value={game?.date ? moment(game.date).format('YYYY-MM-DD') : ''}
          onChange={event => setGame({ ...game, date: event.target.value })}
          inputLabelOpen
          error={game?.errors?.date}
        />

        <div className="flex gap-3">
          <Input
            type='time'
            name="startHours"
            label='Início'
            onChange={event => setGame({ ...game, startHours: event.target.value })}
            value={game?.startHours ?? ''}
            inputLabelOpen
            error={game?.errors?.startHours}

          />

          <Input
            type='time'
            name="endHours"
            label='Fim'
            onChange={event => setGame({ ...game, endHours: event.target.value })}
            value={game?.endHours ?? ''}
            inputLabelOpen
            error={game?.errors?.endHours}

          />
        </div>
        <Input
          name='userId'
          label="Mediador"
          value={game.userId ?? ''}
          onChange={event => setGame({ ...game, userId: event.target.value })}
          error={game.errors?.userId}
          options={users.map(user => {
            return {
              ...user,
              name: user.email
            }
          })}

        />
        <Input
          name='place_id'
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
        {game.modalityId &&
          <MultiSelect
            label="Equipes"
            items={teams}
            selected={selectedTeams}
            setSelected={setSelectedTeams}
            columns={2}
            limit={modalities.find(modality => modality.id === game.modalityId)?.teamsQuantity}
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
            onClick={() => {
              setGame({} as GameInterface)
              setOpenForm(false)
              window.scrollTo({top:0, behavior:'smooth'})
            }}
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
        date: game.date ? moment(game.date).toDate() : undefined,
        teams: selectedTeams.map(team => {
          return {
            id: team,
            goals:0,
            fairPlay:0,
            points: 0
          }
        }).sort((a,b) => a.id - b.id),
        unity_id: storageLogged()?.unityId
      }
      if (game.id) {
        await api.patch(`games/${game.id}`, body)
      } else {
        const { data } = await api.post('games', body)
        // setGame(data)
        setGame({} as GameInterface)
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