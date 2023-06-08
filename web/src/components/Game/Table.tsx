import { Edit, Sports } from "@mui/icons-material";
import { GameInterface } from "../../interfaces";
import { Card } from "../Card";
import { Plus } from "phosphor-react";
import clsx from "clsx";
import { Input } from "../Input";
import { useState } from "react";

interface Props {
  games: GameInterface[]
  setGameEdit: Function
  setGameSport: Function
  openFormEdit: boolean
  setOpenFormEdit: (openFormEdit: boolean) => void
  openFormSport: boolean
  setOpenFormSport: (openFormSport: boolean) => void
  gameEdit: GameInterface
  gameSport: GameInterface
}

export function Table({
  games: gamesWithoutFilter, setGameEdit, setGameSport, openFormEdit, setOpenFormEdit, openFormSport, setOpenFormSport, gameEdit, gameSport
}: Props) {

  const [search, setSearch] = useState('')

  const games = gamesWithoutFilter.filter(game => {
    return (
      game.datetime.includes(search) ||
      game.modality.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <Card>
      <Input
        label="Pesquisar"
        placeholder="Pesquisar por Data ou Modalidade"
        name="search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <table className="w-full mt-5">
        <thead>
          <tr className="">
            {['Data', 'Modalidade', 'Local', 'Juíz', 'Ação'].map(header => {
              return (
                <th
                  key={header}
                  className="text-start"
                >
                  {header}
                </th>
              )
            })}

          </tr>
        </thead>
        <tbody>
          {games?.map(game => {
            return (
              <tr
                key={game.id}
                className={clsx('border-t text-sm', {
                  'bg-blue-100': game.id === gameEdit.id || game.id === gameSport.id
                })}
              >
                <td>{game.datetime}</td>
                <td>{game.modality.name}</td>
                <td>{game.place.name}</td>
                <td>{game.user.name}</td>
                <td className="flex gap-2 h-10 items-center">
                  <Sports
                    fontSize="small"
                    className={clsx("text-zinc-600 cursor-pointer", {
                      'text-blue-500': game.id === gameSport.id
                    })}
                    onClick={() => {
                      setGameSport(game)
                      setOpenFormEdit(false)
                      setOpenFormSport(true)
                      setGameEdit({} as GameInterface)
                      scroll(games.length)

                    }} />
                  <Edit
                    fontSize="small"
                    className={clsx("text-zinc-600 cursor-pointer", {
                      'text-blue-500': game.id === gameEdit.id
                    })}
                    onClick={() => {
                      setGameEdit(game)
                      setOpenFormSport(false)
                      setOpenFormEdit(true)
                      setGameSport({} as GameInterface)
                      scroll(games.length)
                    }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <button
        className={clsx("bg-blue-500 text-white fixed bottom-10 right-10 p-3 rounded-full hover:p-4 hover:bg-blue-600 transition-all", {
          'invisible': openFormEdit === true || openFormSport === true
        })}

        title="Cadastrar Jogo"
        onClick={() => { setOpenFormEdit(true), setOpenFormSport(false) }}
      >
        <Plus size={30} weight="bold" />
      </button>
    </Card>
  )
  function scroll(quantity: number) {
    const width = document.querySelector('body')?.offsetWidth
    if (Number(width) > 1024) {
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.scrollTo({ top: quantity * 123, behavior: 'smooth' })
  }

}