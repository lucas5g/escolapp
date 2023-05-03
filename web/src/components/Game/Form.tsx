
import { GameInterface } from "../../pages/Game";
import { swr } from "../../utils/swr";
import { Card } from "../Card";
import { FormHandle } from "../FormHandle";
import { Input } from "../Input";

interface Props {
  game: GameInterface
  setGame: (game: GameInterface) => void
}



export function Form({ game, setGame }: Props) {

  const { data: places, error: errorPlaces } = swr('places')
  const { data: modalities, error: errorModalities } = swr('modalities')
  const { data: users, error: errorUsers } = swr('users')

  return (
    <Card>
      <form className="form">
        <Input
          type="date"
          name="date"
          label="Data"
          value=''
          onChange={event => setGame({ ...game, date: event.target.value })}
          inputLabelOpen
          error={game.errors?.date}
        />
        <Input
          type="time"
          name="startHours"
          label="Início"
          onChange={event => setGame({ ...game, startHours: event.target.value })}
          inputLabelOpen
          error={game.errors?.startHours}

        />
        {/* <Input
          type="time"
          name="endHours"
          label="Fim"
          onChange={event => setGame({ ...game, endHours: event.target.value })}
          inputLabelOpen
        />
        {places &&
          <Input
            name="placeId"
            label="Local"
            options={places}
            value={game.placeId ?? ''}
            onChange={event => setGame({ ...game, placeId: event.target.value })}

          />
        }
        {modalities &&
          <Input
            name="modalityId"
            label="Modalidades"
            options={modalities}
            value={game.modalityId ?? ''}
            onChange={event => setGame({ ...game, modalityId: event.target.value })}
          />
        }
        {users &&
          <Input
            name="userId"
            label="Juízes"
            options={users}
            value={game.userId ?? ''}
            onChange={event => setGame({ ...game, userId: event.target.value })}
          />
        } */}


      </form>
    </Card>
  )
}

{/* <Form
fields={fieldsForm}
item={{
  ...game,
  modality: undefined,
  place: undefined,
  user: undefined
}}
setItem={setGame}
uri={'games'}
>
<TextField
  name='date'
  label='Data'
  type='date'
  InputLabelProps={{ shrink: true }}
  value={game?.date ? moment(game.date).format('YYYY-MM-DD') : ''}
  // onChange={event => setGame({ ...game, date: moment(event.target.value).format() })}
  onChange={event => setGame({ ...game, date: moment(event.target.value).toDate() })}

/>
<div className="flex gap-4">
  <TextField
    name='startHours'
    label='Início'
    type='time'
    value={game?.startHours ?? ''}
    onChange={event => setGame({
      ...game,
      startHours: event.target.value,
      endHours: moment(event.target.value, 'HH:mm').add(1, 'hours').format('HH:mm')
    })}
    fullWidth
    InputLabelProps={{ shrink: true }}

  />
  <TextField
    name='endHours'
    label='Fim'
    type='time'
    value={game?.endHours || ''}
    onChange={event => setGame({ ...game, endHours: event.target.value })}
    fullWidth
    InputLabelProps={{ shrink: true }}

  />
</div>
</Form> */}