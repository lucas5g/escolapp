import moment from "moment"
import { GameInterface } from "../../interfaces"
import { Card } from "../Card"
import clsx from "clsx"
import { renameLowerCase } from "../../utils/rename-lowercase"

interface Props {
  game: GameInterface
}

export function Info({ game }: Props) {

  if (!game.id) {
    return (
      <Card>
        Selecione o jogo para visualizar as informações.
      </Card>
    )
  }
  return (
    <Card>
      <div className="text-sm border-b pb-2 flex gap-3">
        <span>
          <strong>
            {moment(game.date).format('DD/MM')}
          </strong>
          {' '}
          - {game.hours}
        </span>
        <span>|</span>
        <span>
          <strong>{game.teams?.length}</strong> Equipes
        </span>
        <span>|</span>
        <span>
          {game.user?.name}
        </span>

      </div>
      <div className="grid grid-cols-2 ml-auto text-sm gap-2">

        {game.teamsStudents?.map((team, i) => {
          return (
            <div
              key={team.name}
              className={clsx('mt-5', {
                // 'text-end': (i + 1) % 2 === 0
              })}
            >
              <strong className="text-zinc-700">
                {team.name}
              </strong>
              <ul className="flex flex-col gap-1">
                {team.students
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(student => {
                    return (
                      <li key={student.ra}  className="border rounded pl-1 py-1">
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
  )
}