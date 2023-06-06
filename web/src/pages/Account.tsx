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

const fields = [
  { key: 'name', value: 'Nome' },
  { key: 'email', value: 'E-mail' },
  { key: 'password', value: 'Senha', type:'password' },

]
export function Account() {

  const [me, setMe] = useState<UserInterface>()
  const [loading, setLoading] = useState<boolean>()
  const { data, error }: { data: UserInterface, error: any } = swr('me')

  if (error) return <Error error={error} />
  if (!data) return <Loading />


  return (
    <Layout>
      <Main>
        <Card>
          <Button 
            value="Limpar Cache" 
            disabled={loading}
            onClick={async() => {
              setLoading(true)
              await api.get('clear-caches')
              await sleep(800)
              setLoading(false)
            }}
            />
        </Card>
        <Form
          item={me || data}
          setItem={setMe}
          fields={fields}
          uri="update-me"
          hasButtonCancel={false}          
        />
      </Main>
    </Layout>
  )
}