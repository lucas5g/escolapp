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

  const [place, setPlace] = useState({})
  const { data, error } = swr('places')

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
        />
        <Form
          fields={fields}
          item={place}
          setItem={setPlace}
          uri='places'
        />

      </Main>
    </Layout>
  )
}