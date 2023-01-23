import { Error } from "@/components/Error";
import { Form } from "@/components/Form";
import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Title } from "@/components/Title";
import { useFetch } from "@/utils/useFetch";
import { useState } from "react";
import { filter } from "../utils";

interface Group {
  id: number
  name: string,
  codcur: number
  codper: number

}

export default function Group() {

  const { data, error } = useFetch('/groups')
  const [group, setGroup] = useState({} as Group)
  const [search, setSearch] = useState('')

  const fields = [
    { key: 'name', value: 'Nome',  },
    { key: 'codcur', value: 'Codcur' },
    { key: 'codper', value: 'Codper'  }
  ]

  const fieldsForm = [
    { key: 'name', value: 'Nome da Tuma',  },
    { key: 'codcur', value: 'Código do Curso' },
    { key: 'codper', value: 'Código do Período'  }
  ]



  if (error) return <Error error={error} />
  if (!data) return <Loading />

  const groups = filter(data, search)

  return (
    <Layout>
      <Title title="Turmas" />
      <div className="container">
        <Table
          fields={fields}
          items={groups}
          search={search}
          setItem={setGroup}
          setSearch={setSearch}
        />

        <Form
          item={group}
          setItem={setGroup}
          fields={fieldsForm}
          uri="/groups"
        />
      </div>
    </Layout>
  )
}