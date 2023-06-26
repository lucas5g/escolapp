import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { setTimeout } from 'timers/promises'

import { games, groups, modalities, places, setups, teams, unities, users } from './data'

const prisma = new PrismaClient();
const types: any = {
  collective: 'collective',
  individual: 'individual'
};
const profiles: any = {
  manager: 'manager',
  judge: 'judge',
  coordinator: 'coordinator'
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
  await createSetups()
})()

async function createSetups(){
  setups.forEach(async(setup) => {
    await prisma.setup.upsert({
      where:{id: setup.id},
      update: setup,
      create: setup
    })
  })
}


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
      const userObj = {
          ...user,
          password: await bcrypt.hash(user.password, 12),
          profile: profiles[user.profile]
      }

      await prisma.user.upsert({
        where: { id: user.id },
        update: userObj,
        create: userObj,
      })
    } catch (error) {
      console.log(`${error} ${user.name} - ${user.email}`)
    }
  })
}

async function createGames() {
  games.forEach(async (game) => {
    try{

      await prisma.game.upsert({
        where:{id: game.id},
        update: game,
        create: game
      })
    }catch(error){
      console.log(error)
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


