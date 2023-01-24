import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";

export function Team() {
  const fields = [
    { key: 'name', value: 'Nome da Turma',  },
    { key: 'codcur', value: 'Código do Curso' },
    { key: 'codper', value: 'Código do Período'  }
  ]


  return (
    <Layout>
      <Card>
        <p>Criação das Equipes</p>
      </Card>
      {/* <Main>

      </Main> */}
    </Layout>
  )
}