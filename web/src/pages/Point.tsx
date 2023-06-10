import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { Main } from "../components/Main";
import { Table } from "../components/Table";
import { swr } from "../utils/swr";

const fields = [
  {key: 'name', value: 'Nome' },
  {key: 'totalPoints', value: 'Pontos'}
]

export function Point() {

  const {data, error} = swr('points')

  if(error) return <Error error={error} />
  if(!data) return <Loading />

  return (
    <Layout>
      <Main>
        <Table
          fields={fields}
          items={data}
          item={{}}
          setItem={() => {}}
        />
      </Main>
    </Layout>
  )
}