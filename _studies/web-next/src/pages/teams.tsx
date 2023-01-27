import { Error } from "@/components/Error";
import { Form } from "@/components/Form";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Title } from "@/components/Title";
import { useFetch } from "@/utils/useFetch";
import { useState } from "react";
import { filter } from "../utils";

interface Team {
  id: number
  name: string
  gender: 'Misto' | 'Masculino' | 'Feminino'
}

export default function Team() {

  const { data, error } = useFetch('/teams')
  const [team, setTeam] = useState({} as Team)
  const [search, setSearch] = useState('')

  const fields = [
    {key: 'name', value: 'Nome'},
    // {}
  ]

  // const fields = {
  //   name: 'Nome',
  //   gender: {
  //     '': 'Selecione o Gênero',
  //     mixed: 'Misto',
  //     masculine: 'Masculino',
  //     feminine: 'Feminino'
  //   }

  // }

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const teams = filter(data, search)

  return (
    <>
      <Title title="Equipes" />
      <div className="container">

        <Table
          fields={fields}
          items={teams}
          setItem={setTeam}
          search={search}
          setSearch={setSearch}
        />
        <Form
          item={team}
          setItem={setTeam}
          fields={fields}
          uri='/teams'
        />
      </div>
    </>
  )
}