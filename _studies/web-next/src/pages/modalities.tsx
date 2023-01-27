import { useEffect, useState } from "react";
import { Error } from "@/components/Error";
import { Loading } from "@/components/Loading";
import { Table } from "@/components/Table";
import { Title } from "@/components/Title";
import { useFetch } from "@/utils/useFetch";
import { Form } from "@/components/Form";
import { filter } from "@/utils/index";
import { Layout } from "@/components/Layout";

interface Modality{
  id: number 
  name: string 
  teamsQuantity: number 
  membersQuantity: number
}

export default function Modality() {

  const { data, error } = useFetch('/modalities')
  const [modality, setModality] = useState({} as Modality)                       
  const [search, setSearch] = useState('')


  const fields = [
    {key: 'name', value: 'Nome'},
    {key: 'teamsQuantity', value: 'Qtd. Equipes'},
    {key: 'membersQuantity', value: 'Qtd. Membros'}
  ]

  const fieldsForm = [
    {key: 'name', value: 'Nome da Modalidade'},
    {key: 'teamsQuantity', value: 'Qtd. Equipes'},
    {key: 'membersQuantity', value: 'Qtd. Membros'}
  ]
    
  if (error) return <Error error={error} />
  if (!data) return <Loading />
  
  const modalities = filter(data, search)

  return (
    <Layout>
      <Title title='Modalidades' />
      <div className="container">

        <Table
          fields={fields}
          items={modalities}
          setItem={setModality}
          search={search}
          setSearch={setSearch}
          />

        <Form
          fields={fieldsForm}
          item={modality}
          setItem={setModality}
          uri={'/modalities'}
          /> 
      </div>
    </Layout>
  )
}