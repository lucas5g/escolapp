import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";
import { Form } from "../components/Form";

const fields = [
  { key: 'name', value: 'Nome', },
  // { key: 'unity', value: 'Unidade' },
  { key: 'quantity', value: 'Quantidade' }
]

const fieldsForm = [
  { key: 'name', value: 'Nome' },
]

export function Group() {

  const [group, setGroup] = useState({} as any)
  const uri = `groups?unityId=${localStorage.getItem('unityId')}` 
  const { data: groups, error } = swr(uri)
  localStorage.setItem('uri', 'groups')

  if (error) return <Error error={error} />
  if (!groups) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={groups}
          item={group}
          setItem={setGroup}
          positionBottom={groups.length * 100}
          deleteItem
        />
        <Form
          fields={fieldsForm}
          item={group}
          setItem={setGroup}
          uri={uri}
        />

      </Main>
    </Layout>
  )
}