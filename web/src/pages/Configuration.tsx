import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Form } from "../components/Form";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { UserInterface } from "../interfaces";
import { swr } from "../utils/swr";
import { Main } from "../components/Main";

const fields = [
  { key: 'name', value: 'Nome' },
  { key: 'email', value: 'E-mail' },
  { key: 'password', value: 'Senha' },

]
export function Configuration() {

  const [me, setMe] = useState<UserInterface>()
  const { data, error }: { data: UserInterface, error: any } = swr('me')

  // useEffect(() => {
  //   setMe(data)
  // }, [data])

  if (error) return <Error error={error} />
  if (!data) return <Loading />


  return (
    <Layout>
      <Main>
        <Card>
          {JSON.stringify(me)}
        </Card>
        <Form
          item={me || data}
          setItem={setMe}
          fields={fields}
          uri="users"

        />
      </Main>
    </Layout>
  )
}