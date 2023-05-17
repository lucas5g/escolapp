import moment from "moment";
import { GameInterface, ModalityInterface, PlaceInterface, UserInterface } from "../../interfaces";
import { Card } from "../Card";
import { Input } from "../Input";

interface Props {
  places: PlaceInterface[]
  modalities: ModalityInterface[]
  users: UserInterface[]
  game: GameInterface
  setGame: (game: GameInterface) => void
}

export function Form({ places, modalities, users, game, setGame }: Props) {
  // console.log({game})
  return (
    <Card>
      <form className="flex flex-col gap-3" onSubmit={() => { }}>
        <Input
          type="date"
          name="date"
          label="Date"
          value={moment(game.date).format('YYYY-MM-DD') ?? ''}
          onChange={event => setGame({ ...game, date: event.target.value })}
          inputLabelOpen

        />
        <div className="flex gap-3">
          <Input
            type='time'
            name="startHours"
            label='Início'
            value={game.startHours ?? ''}
            inputLabelOpen
          />
          <Input
            type='time'
            name="endHours"
            label='Fim'
            value={game.endHours ?? ''}
            inputLabelOpen
          />
        </div>
        <Input
          name='placeId'
          label="Local"
        />
      </form>
    </Card>
  )
}