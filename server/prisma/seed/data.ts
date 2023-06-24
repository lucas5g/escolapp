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
    "id": 1,
    "name": "F1AMARELO",
    unityId: 2
  },
  {
    "id": 2,
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

export const places = [
  {
    id: 1,
    name: 'Quadra'
  },
  {
    id: 2,
    name: 'sala'
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
    name: 'admin',
    unityId: 2,
    profile: 'judge'
  },


]

export const games = [
  {
    id: 1,
    date: "2023-03-15 04:29:51.961",
    startHours: "08:00",
    endHours: "09:00",
    placeId: 1,
    modalityId: 1,
    userId: 1,
    teams: [
      {
        id: 1,
        gols: 0,
        points: 0,
        fairPlay: 0
      },
      {
        id: 2,
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
    id: 1,
    name: 'xadrez',
    modalityId: 2,
    groupId: 1,
    genreId: 1,
    students:['C123123', 'C321321']
  }
]