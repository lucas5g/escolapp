import { useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

export function Modality() {

  const fields = [
    { key: 'name', value: 'Nome da Turma',  },
    { key: 'codcur', value: 'Código do Curso' },
    { key: 'codper', value: 'Código do Período'  }
  ]

  const [course, setCourse] = useState({})
  const { data, error } = swr('courses')

  if (error) return <Error error={error}/>
  if (!data) return <Loading />

  const courses = data

  return (
    <Layout>
      Menu modalidades
      {/* <Main>
        <Table
          heads={['Nome', 'Cód. Curso', 'Cód. Período']}
          items={courses}
          item={course}
          setItem={setCourse}
        />
        <Form
          fields={fields}
          item={course}
          setItem={setCourse}
          uri='courses'
        />

      </Main> */}
    </Layout>
  )
}