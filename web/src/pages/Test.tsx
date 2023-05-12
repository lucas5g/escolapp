import { Autocomplete, TextField } from "@mui/material";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

export function Test() {
  const [data, setData] = useState([] as any[])
  const [teams, setTeams] = useState([] as {id:number, name:string, modalityId:number}[])
  const [modality, setModality] = useState(0)
  useEffect(() => {
    setData([])
  }, [modality])

  useEffect(() => {
    setTeams([
      {
        "id": 253,
        "name": "6º ANO 2022 BASQUETE  FEM - TESTE",
        "modalityId": 1
      },
      {
        "id": 248,
        "name": "F1AZUL QUEIMADA_TODOS  MISTO",
        "modalityId": 1

      },
      {
        "id": 249,
        "name": "F1LARANJA QUEIMADA_TODOS  MISTO",
        "modalityId": 2
      },
      {
        "id": 250,
        "name": "F1LILÁS QUEIMADA_TODOS  MISTO",
        "modalityId": 2
      },
      {
        "id": 252,
        "name": "F1VERDE QUEIMADA_TODOS  MISTO",
        "modalityId": 2
      }
    ].filter(team => team.modalityId == modality))
  }, [modality])


  return (
    <Layout>
      <Card>
        {JSON.stringify(data ?? '')}
        {/* {JSON.stringify(teams)} */}
        {modality}
        <select name="" id="" onChange={event => setModality(event.target.value)}>
          <option value={0}>Selecione</option>
          <option value={1}>Mod 1</option>
          <option value={2}>Mod 2</option>
        </select>
        <Autocomplete
          multiple
          options={teams}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          isOptionEqualToValue={(option, data) =>
            option.name === data.name
          }
          onChange={(event, option) => {
            setData(option)
            // console.log(option[0])
          }}
          value={data}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label='Equipes'
              placeholder="Selecione a equipe"
            />
          )}
        />
      </Card>
      {JSON.stringify(teams)}
    </Layout>
  )
}