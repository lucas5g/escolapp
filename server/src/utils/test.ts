const fields = [
  { key: 'name', value: 'Nome da Equipe', },
  { key: 'modality', value: 'Modalidade' },
  // { key: 'groupId', value: 'Turma' },
  // { key: 'genreId', value: 'Gênero' }
]

const teams = [
  { "id": 253, "name": "6º ANO 2022 BASQUETE  FEM - TESTE", "modality": { "id": 26, "name": "BASQUETE", "membersQuantity": 18, "teamsQuantity": 2 }, "group": { "id": 26, "name": "6º ANO 2023", "codcur": 22, "codper": 6 }, "genre": { "id": 2, "name": "FEM" } }, { "id": 254, "name": "8º ANO TESTE 2022 GUERRA DE ALMOFADAS  MAS", "modality": { "id": 32, "name": "GUERRA DE ALMOFADAS", "membersQuantity": 8, "teamsQuantity": 2 }, "group": { "id": 27, "name": "Turma test 11", "codcur": 22, "codper": 8 }, "genre": { "id": 1, "name": "MAS" } },
  { "id": 248, "name": "F1AZUL QUEIMADA_TODOS  MISTO", "modality": { "id": 14, "name": "QUEIMADA_TODOS", "membersQuantity": 1, "teamsQuantity": 2 }, "group": { "id": 21, "name": "F1AZUL", "codcur": 22, "codper": 1 }, "genre": { "id": 3, "name": "MISTO" } }, { "id": 249, "name": "F1LARANJA QUEIMADA_TODOS  MISTO", "modality": { "id": 14, "name": "QUEIMADA_TODOS", "membersQuantity": 1, "teamsQuantity": 2 }, "group": { "id": 20, "name": "F1LARANJA", "codcur": 22, "codper": 1 }, "genre": { "id": 3, "name": "MISTO" } }, { "id": 250, "name": "F1LILÁS QUEIMADA_TODOS  MISTO", "modality": { "id": 14, "name": "QUEIMADA_TODOS", "membersQuantity": 1, "teamsQuantity": 2 }, "group": { "id": 24, "name": "F1LILÁS", "codcur": 22, "codper": 1 }, "genre": { "id": 3, "name": "MISTO" } }, { "id": 252, "name": "F1VERDE QUEIMADA_TODOS  MISTO", "modality": { "id": 14, "name": "QUEIMADA_TODOS", "membersQuantity": 1, "teamsQuantity": 2 }, "group": { "id": 22, "name": "F1VERDE", "codcur": 22, "codper": 1 }, "genre": { "id": 3, "name": "MISTO" } }]

// console.log(teams)
teams.forEach(team => {
  // console.log(team)

  fields.forEach(field => {
    console.log(team[field.key]['name'] || team[field.key] )
  })
})