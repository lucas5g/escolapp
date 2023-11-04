import { useState } from "react";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

const fields = [
  { key: 'name', value: 'Nome', },
  { key: 'quantity', value: 'Quantidade' }
]


export function Group() {

  const [group, setGroup] = useState({} as any)

  const uri = 'groups' 
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
        />
       
      </Main>
    </Layout>
  )
}