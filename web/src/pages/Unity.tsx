import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Form";

export function Unity() {

  const [unity, setUnity] = useState({} as any)
  const fields = [
    { key: 'name', value: 'Nome' }
  ]


  const { data, error } = swr('unities')

  if (error) return <Error error={error} />
  if (!data) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={data}
          item={unity}
          setItem={setUnity}
        />
        <Form
          item={unity}
          fields={fields}
          setItem={setUnity}
          uri='unities'
        />

      </Main>
    </Layout>
  )
}