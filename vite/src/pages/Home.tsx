import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { swr } from "../utils/swr";

export function Home() {

  const { data, error } = swr('me')

  if(error) return <Error error={error} />
  if(!data) return <p>Carregando!</p>

  return (
   <Layout>
      <Card>
        Aplicação para a gestão do JISA.
      </Card>

   
    </Layout>
  )
}