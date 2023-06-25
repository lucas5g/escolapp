import { useState } from "react";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

export function Place() {

  const fields = [
    { key: 'name', value: 'Nome do Local',  },
  ]
  localStorage.setItem('uri', 'places')
  const uri = `places`
  const [place, setPlace] = useState({})
  const { data, error } = swr(uri)

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const places = data

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          item={place}
          items={places}
          setItem={setPlace}
          positionBottom={places.length * 100}
          deleteItem
        />
        <Form
          fields={fields}
          item={place}
          setItem={setPlace}
          uri={uri}
        />

      </Main>
    </Layout>
  )
}