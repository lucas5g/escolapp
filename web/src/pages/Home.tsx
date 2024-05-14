import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { swr } from "../utils/swr";
import { SetupInterface } from "../interfaces";
import { Link } from "phosphor-react";

export function Home() {

  const { data, error }: { data: SetupInterface[], error: any } = swr('setups')
  if (error) return <Error error={error} />
  if (!data) return <Loading />



  return (
    <Layout>
      <Card>
        Aplicação para a gestão do JISA.
      </Card>
      {data[0]?.documentLink &&
        <Card>
          <a
            href={data[0].documentLink}
            className="text-blue-600 flex items-center gap-2"
            target="_blanket"
          >
            Documentos <Link weight="bold" />
          </a>
        </Card>
      }
    </Layout>
  )
}