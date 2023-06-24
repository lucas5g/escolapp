import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { setTimeout } from 'timers/promises'

import { games, groups, modalities, places, teams, unities, users } from './data'

const prisma = new PrismaClient();
const types: any = {
  collective: 'collective',
  individual: 'individual'
};
const profiles: any = {
  manager: 'manager',
  judge: 'judge'
};

(async () => {

  await createUnities()
  await setTimeout(500)

  await createUsers()
  await createGroups()
  await createModalities()
  await createPlaces()

  await createGenres()
  await setTimeout(500)
  // return;
  await createTeams()
  await createGames()
})()


async function createUnities() {
  unities.forEach(async (unity) => {
    await prisma.unity.upsert({
      where: { id: unity.id },
      update: unity,
      create: unity
    })
  })
}

async function createUsers() {

  users.forEach(async (user) => {
    try {

      await prisma.user.upsert({
        where: { id: user.id },
        update: { ...user, profile: profiles[user.profile] },
        create: { ...user, profile: profiles[user.profile] },
      })
    } catch (error) {
      console.log(`${error} ${user.name} - ${user.email}`)
    }
  })
}

async function createGames() {
  await setTimeout(2000)
  games.forEach(async(game) => {
    await prisma.game.create({
      data: game
    })
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
      console.log(error)
    }
  })

}

async function createGroups() {

  groups.forEach(async (group) => {
    try {
      await prisma.group.upsert({
        where: { id: group.id },
        update: group,
        create: group
      })
    } catch (error) {
      console.log(error)
    }
  })

}

async function createModalities() {
  modalities.forEach(async (modality) => {
    try {
      await prisma.modality.upsert({
        where: { id: modality.id },
        update: { ...modality, type: types[modality.type] }, // change the type property to an enum value
        create: { ...modality, type: types[modality.type] },
      });
    } catch (error) {
      console.log(error);
    }
  });
}

async function createPlaces() {

  places.forEach((async (place) => {
    await prisma.place.upsert({
      where: { id: place.id },
      update: place,
      create: place
    })
  }))
}


