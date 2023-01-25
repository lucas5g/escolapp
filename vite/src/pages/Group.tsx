import { useState } from "react";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

interface Group {
  id: number
  name: string
  codcur: number
  codper: number
}

export function Group() {

  const [group, setGroup] = useState({} as Group)
  const { data, error } = swr('groups')

  const fields = [
    { key: 'name', value: 'Nome da Turma',  },
    { key: 'codcur', value: 'Código do Curso' },
    { key: 'codper', value: 'Código do Período'  }
  ]


  if (error) return <p>erro</p>
  if (!data) return <Loading />

  const groups: Group[] = data

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={groups}
          item={group}
          setItem={setGroup}
        />
        <Form 
          fields={fields}
          item={group}
          setItem={setGroup}
          uri='groups'
          />
      
      </Main>
    </Layout>
  )
}