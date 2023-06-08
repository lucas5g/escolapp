import { GameInterface } from "../../interfaces";
import { Card } from "../Card";

interface Props {
  games: GameInterface[]
}

export function Table({ games }: Props) {
  return (
    <Card>
      <table>
        <thead>
          <th>ID</th>
          <th>Data</th>
          <th>Local</th>
          <th>Juíz</th>
          <th>Ação</th>
        </thead>
        <tbody>
          {games?.map(game => {
            return (
              <tr></tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}