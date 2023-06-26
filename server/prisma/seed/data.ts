import { PlaceType } from "../../src/utils/schemas"

export const unities = [
  {
    id: 1,
    name: 'bh'
  },
  {
    id: 2,
    name: 'contagem'
  },
  {
    id: 3,
    name: 'unity test'
  }
]
export const groups = [
  {
    id: 1,
    name: 'TESTE',
    unityId:2
  },
  {
    "id": 2,
    "name": "F1AMARELO",
    unityId: 2
  },
  {
    "id": 3,
    "name": "F1VERDE",
    unityId: 2
  }
]

export const modalities = [
  {
    "id": 1,
    "name": "Futebol",
    "membersQuantity": 10,
    "teamsQuantity": 2,
    "type": "collective",
    unityId: 2
  },
  {
    "id": 2,
    "name": "xadrez",
    "membersQuantity": 1,
    "teamsQuantity": 2,
    "type": "individual",
    unityId: 2
  }
]

export const places:PlaceType[] = [
  {
    id: 1,
    name: 'Quadra',
    unityId: 2

  },
  {
    id: 2,
    name: 'sala',
    unityId: 2
  },
  {
    id: 3,
    name: 'campo bh',
    unityId: 1
  }
]

export const users = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: 'qweqwe',
    name: 'admin',
    unityId: 2,
    profile: 'manager'
  },
  {
    id: 2,
    email: 'juiz@mail.com',
    password: 'qweqwe',
    name: 'juiz',
    unityId: 2,
    profile: 'judge'
  },
  {
    id: 3,
    email: 'coordenador@mail.com',
    password: 'qweqwe',
    name: 'coordenador',
    unityId: 2,
    profile: 'coordinator'
  },



]

export const games = [
  {
    id: 1,
    // date: "2023-03-15",
    date: new Date().toISOString(),
    startHours: "08:00",
    endHours: "09:00",
    placeId: 1,
    modalityId: 1,
    userId: 2,
    teams: [
      {
        id: 1,
        gols: 0,
        points: 0,
        fairPlay: 0
      },
      {
        id: 3,
        gols: 0,
        points: 0,
        fairPlay: 0
      },
    ]
  }
]

export const teams = [
  {
    id: 1,
    name: 'Futebol',
    modalityId: 1,
    groupId: 1,
    genreId: 3,
    students:['C123123', 'C321321']
  },
  {
    id: 2,
    name: 'xadrez',
    modalityId: 2,
    groupId: 1,
    genreId: 1,
    students:['C123123', 'C321321']
  },
  {
    id: 3,
    name: 'Futebol 3',
    modalityId: 1,
    groupId: 1,
    genreId: 3,
    students:['C123123', 'C321321']
  },
  {
    id: 4,
    name: 'Futebol 4',
    modalityId: 1,
    groupId: 1,
    genreId: 3,
    students:['C123123', 'C321321']
  },
]


export const setups = [
  {
    id: 1,
    unityId: 2,
    documentLink:'https://docs.google.com/document/d/1U0uJvTwSmepAQZgiPAlbNiqYBY4RggBCV4bjtO5H9zY/edit?usp=drive_link'
  },
  {
    id: 2,
    unityId: 1,
    documentLink:'https://docs.google.com/document/d/1U0uJvTwSmepAQZgiPAlbNiqYBY4RggBCV4bjtO5H9zY/edit?usp=drive_link'
  },

]