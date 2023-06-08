import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { GameInterface, ModalityInterface, PlaceInterface, TeamInterface, UserInterface } from "../interfaces";

const fields = [
  { key: 'date', value: 'Data', },
  { key: 'hours', value: 'Horas',},
  { key: 'place', value: 'Lugar' },
  { key: 'modality', value: 'Modalidade' },
  { key: 'user', value: 'Juíz' },

]

export function Schedule() {

  const [game, setGame] = useState({} as GameInterface)
  const uri = 'games'

  const { data:games, error }: { data: GameInterface[], error: any } = swr(uri)
  const { data: teams }: { data: TeamInterface[] } = swr('teams')

  if (error) return <Error error={error} />
  if (!games || !places || !modalities || !users || !teams) return <Loading />
  
  return <></>

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={games}
          item={game}
          setItem={setGame}
          positionBottom={games.length * 100}
          placeholderInputFilter="Pesquisar por Data ou Modalida"
        />
        <Form
          game={game}
          setGame={setGame}
          places={places}
          modalities={modalities}
          users={users}
          teams={teams}
          />
      </Main>
    </Layout>
  )
}