import { useState } from "react";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { GameInterface, ModalityInterface, PlaceInterface, StudentInterface, TeamInterface, UserInterface } from "../interfaces";
import { FormSport } from "../components/Game/FormSport";
import { swr } from "../utils/swr";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { Table } from "../components/Game/Table";
import { FormEdit } from "../components/Game/FormEdit";
import { storageLogged } from "../utils/storage-logged";


export function Game() {
  const [gameEdit, setGameEdit] = useState({} as GameInterface)
  const [gameSport, setGameSport] = useState({} as GameInterface)
  const [openFormEdit, setOpenFormEdit] = useState<boolean>(false)
  const [openFormSport, setOpenFormSport] = useState<boolean>(false)
  const logged = storageLogged()

  const uri = logged.profile === 'judge' ? `games?userId=${logged.id}` : 'games'

  const { data, error }: { data: GameInterface[], error: any } = swr(uri)
  const { data: teams }: { data: TeamInterface[] } = swr('teams')
  const { data: students }: { data: StudentInterface[] } = swr('students')
  const { data: users }: { data: UserInterface[] } = swr('users?profile=judge')
  const { data: places }: { data: PlaceInterface[] } = swr('places')
  const { data: modalities }: { data: ModalityInterface[] } = swr('modalities')

  if (error) return <Error error={error} />
  if (!data || !teams || !students) return <Loading />
  const games = data
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