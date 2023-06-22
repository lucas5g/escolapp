import { PrismaClient } from '@prisma/client'
import csvtojson from 'csvtojson'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { idToStringProfile } from '../../src/utils/id-to-string-profile'
import { setTimeout } from 'timers/promises'
import groups from './data/groups.json'
import modalities from './data/modalities.json'
import teams from './data/teams.json'

const prisma = new PrismaClient();

(async () => {

  await createUsers()
  await createGroups()
  await createModalities()
  await createGenres()
  await createPlaces()
  await createTeams()
  await createGame()
})()



async function createUsers() {
  const usersFile = `${__dirname}/data/users.csv`
  let users = []
  if (fs.existsSync(usersFile)) {
    users = await csvtojson().fromFile(usersFile)
  } else {
    users = [
      {
        email: 'admin@mail.com',
        name: 'test',
        password: 'qweqwe',
        profile: 'manager'
      }
    ]
  }

  users.forEach(async (user) => {
    try {

      await prisma.user.upsert({
        where: {
          email: user.email || `${user.user}@santoagostinho.com.br`,
        },
        update: {
          email: user.email || `${user.user}@santoagostinho.com.br`,
          name: user.name,
          password: await bcrypt.hash(user.password, 12),
          profile: idToStringProfile(user.id_perfil)
        },
        create: {
          email: user.email || `${user.user}@santoagostinho.com.br`,
          name: user.name,
          password: await bcrypt.hash(user.password, 12),
          profile: idToStringProfile(user.id_perfil)

        }
      })
      // console.log(`${user.name} atualizado com sucesso!`)
    } catch (error) {
      console.log(`${error} ${user.name} - ${user.email}`)
    }
  })
}

async function createGame() {
  await setTimeout(2000)
  await prisma.game.create({
    data: {
      date: '2023-03-15T04:29:51.961Z',
      startHours: '08:00',
      endHours: '09:00',
      placeId: 1,
      modalityId: 1,
      userId: 1,
      teams: [1, 2]
    }
  })
}

async function createGenres() {
  const genres = [
    { id: 2, name: 'FEM' },
    { id: 1, name: 'MAS' },
    { id: 3, name: 'MISTO' }
  ]

  genres.forEach(async (row) => {
    await prisma.genre.upsert({
      where: {
        id: row.id
      },
      update: row,
      create: row
    })
    // console.log(`${row.name} atualizado com sucesso!`)
  })
}

async function createTeams() {

  teams.forEach(async (team, index) => {
    try {

      await prisma.team.upsert({
        where: { id: team.id },
        update: team,
        create: team
      })
    } catch (error) {
      console.log(error + team.name)
    }
  })

}

async function createGroups() {

  // const groups = [{ id: 1, name: 'turma test', codcur: 20, codper: 1 }]
  groups.forEach(async (group, index) => {
    try {

      await prisma.group.upsert({
        where: {
          id: group.id
        },
        update: {
          ...group,
          unity: 'contagem'
        },
        create: {
          ...group,
          unity: 'contagem'
        }
      })
    } catch (error) {
      console.log(group)
    }
  })

}

async function createModalities() {
  modalities.forEach((async (modality) => {
    try {

      await prisma.modality.upsert({
        where: {
          id: modality.id
        },
        update: modality,
        create: modality
      })
      // console.log(`${index + 1} ${modality.name} - Atualizado!`)
    } catch (error) {
      console.log(error)
      // console.log(`Erro no cadastro`, modality)
    }
  }))
}

async function createPlaces() {

  const places = await csvtojson().fromFile(`${__dirname}/data/places.csv`)

  places.forEach((async (place) => {
    await prisma.place.upsert({
      where: {
        id: Number(place.id)
      },
      update: {
        name: place.name
      },
      create: {
        id: Number(place.id),
        name: place.name
      }
    })
  }))
}


