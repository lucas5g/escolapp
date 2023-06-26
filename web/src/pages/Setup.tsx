import { useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { UserInterface } from "../interfaces";
import { swr } from "../utils/swr";
import { Main } from "../components/Main";
import { Button } from "../components/Button";
import { api } from "../utils/axios";
import { sleep } from "../utils/sleep";


const fieldsSetup = [
  { key: 'documentLink', value: 'Link Documento' }
]

const fieldsMe = [
  { key: 'name', value: 'Nome' },
  { key: 'email', value: 'E-mail', disabled: true },
  { key: 'password', value: 'Senha', type: 'password' },
]


export function Setup() {

  const [me, setMe] = useState<UserInterface>()
  const [setup, setSetup] = useState({} as any)

  const [loading, setLoading] = useState<boolean>()
  const { data, error }: { data: UserInterface, error: any } = swr('me')
  const {data: setups, error:errorSetup}:{data:any, error:any} = swr('setups')

  if (error) return <Error error={error} />
  if (!data || !setups) return <Loading />

  return (
    <Layout>
      <Main>
        <Main position="col">

          <Form
            fields={fieldsSetup}
            item={setup}
            setItem={setSetup}
            hasButtonCancel={false}
            uri='setups'
          />
          <Card>
            <Button
              value="Limpar Cache"
              disabled={loading}
              onClick={async () => {
                setLoading(true)
                await api.get('clear-caches')
                await sleep(800)
                setLoading(false)
              }}
            />

          </Card>
        </Main>
        <Form
          item={me || data}
          setItem={setMe}
          fields={fieldsMe}
          uri="update-me"
          hasButtonCancel={false}
        />
      </Main>
    </Layout>
  )
}