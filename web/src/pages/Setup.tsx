import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { SetupInterface, UserInterface } from "../interfaces";
import { swr } from "../utils/swr";
import { Main } from "../components/Main";
import { Button } from "../components/Button";
import { api } from "../utils/axios";
import { sleep } from "../utils/sleep";
import { storageLogged } from "../utils/storage-logged";


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
  const [setup, setSetup] = useState<SetupInterface>()
  const logged = storageLogged()

  const [loading, setLoading] = useState<boolean>()
  const { data, error }: { data: UserInterface, error: any } = swr('auth/me')
  const { data: setups, error: errorSetup }: { data: any, error: any } = swr('setups')

  if (error || errorSetup) return <Error error={error ?? errorSetup} />
  if (!data || !setups) return <Loading />

  return (
    <Layout>
      <Main>
        <Main position="col">
          {(logged?.profile === 'admin' || logged?.profile === 'coordinator' || logged?.profile === 'manager') &&
            <Form
              title="Confirgurações"
              item={setup || setups[0] || {}}
              setItem={setSetup}
              fields={fieldsSetup}
              hasButtonCancel={false}
              uri='setups'
            />
          }
          <Card>
            <div className="flex justify-end">
              <Button
                value="Limpar Cache"
                disabled={loading}
                secondary
                onClick={async () => {
                  setLoading(true)
                  await api.get('reset-cache')
                  await sleep(800)
                  setLoading(false)
                }}
              />
            </div>

          </Card>
        </Main>
        <Form
          title="Dados da conta"
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