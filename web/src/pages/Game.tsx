import { useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { GameInterface, GroupInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../interfaces";
import { FormSport } from "../components/Game/FormSport";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Table } from "../components/Game/Table";
import { FormEdit } from "../components/Game/FormEdit";
import { storageLogged } from "../utils/storage-logged";
import moment from "moment";


export function Game() {
  const [gameEdit, setGameEdit] = useState({} as GameInterface)
  const [gameSport, setGameSport] = useState({} as GameInterface)
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false)
  const [openFormSport, setOpenFormSport] = useState<boolean>(false)
  const logged = storageLogged()

  const date = moment(moment().format('YYYY-MM-DD')).toISOString()
  const uri = logged?.profile === 'judge' ? `games?userId=${logged.id}&date=${date}` : 'games'

  const { data, error }: { data: GameInterface[], error: any } = swr(uri)
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: users }: { data: UserInterface[] } = swr('users?profile=judge')
  const { data: places }: { data: PlaceInterface[] } = swr('places')
  const { data: modalities }: { data: ModalityInterface[] } = swr('modalities')
  const { data: students }: { data: StudentInterface[] } = swr('students')

  if (error) return <Error error={error} />
  if (!data || !teams || !users || !places || !modalities) return <Loading />
  const games = data.map(game => {
    return {
      ...game,
      datetime: `${moment(game.date).format('DD/MM')} | ${game.startHours} - ${game.endHours}`,
      modality: modalities.find(modality => modality.id === game.modalityId)?.name,
      place: places.find(place => place.id === game.placeId)?.name,
      user: users.find(user => user.id === game.userId)?.email.split('@')[0],

      teams: game.teams.map(gameTeam => {
        const team = teams.find(team => team.id === gameTeam.id)
        return {
          ...gameTeam,
          students: team?.students,
          group: team?.group,
          // name: team?.name
          // students: teams.find(team => gameTeam.id === team.id)?.students,
          name: teams.find(team => team.id === gameTeam.id)?.name
        }
      })


    }
  })

  console.log('games => ', games[0].teams)
  return (
    <Layout>
      <Main>
        <Table
          games={games}
          gameEdit={gameEdit}
          gameSport={gameSport}
          setGameEdit={setGameEdit}
          setGameSport={setGameSport}

          openFormEdit={openFormEdit}
          setOpenFormEdit={setOpenFormEdit}
          openFormSport={openFormSport}
          setOpenFormSport={setOpenFormSport}
        />
        <FormSport
          game={gameSport}
          setGame={setGameSport}
          openForm={openFormSport}
          setOpenForm={setOpenFormSport}
          students={students}
        />
        <FormEdit
          game={gameEdit}
          setGame={setGameEdit}
          users={users}
          places={places}
          modalities={modalities}
          teams={teams}
          openForm={openFormEdit}
          setOpenForm={setOpenFormEdit}
        />
      </Main>

    </Layout>
  )
}