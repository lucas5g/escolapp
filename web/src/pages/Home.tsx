import { useState } from "react";
import { Card } from "../components/Card";
import { Error } from "../components/Error";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { swr } from "../utils/swr";

export function Home() {

  const { data, error } = swr('me')
  const [number, setNumber] = useState<number>()
  if(error) return <Error error={error} />
  if(!data) return <Loading />


  return (
   <Layout>
      <Card>
        Aplicação para a gestão do JISA.
      </Card>

      <input 
        type="number" 
        value={number}
        onChange={event => {

          const  value  = Number(event.target.value)
          
          if(value === 0){
            return setNumber(undefined)
          }

          setNumber(Number(event.target.value))
        }}

      />

   
    </Layout>
  )
}