import { PrismaClient } from '@prisma/client'
import csvtojson from 'csvtojson'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { idToStringProfile } from '../../src/utils/id-to-string-profile'
import { setTimeout } from 'timers/promises'


const prisma = new PrismaClient()

// createUsers()
// createGroups()
// createModalities()
// createGenres()
// createPlaces()
createStudents()
// createTeams()
// createGame()



async function createUsers() {
  const usersFile = `${__dirname}/data/users.csv`
  let users = []
  if (fs.existsSync(usersFile)) {
    users = await csvtojson().fromFile(usersFile)
  } else {
    users = [
      {
        email: 'test@mail.com',
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
  await setTimeout(9000)
  await prisma.game.create({
    data: {
      date: '2023-03-15T04:29:51.961Z',
      startHours: '08:00',
      endHours: '09:00',
      placeId: 1,
      modalityId: 1,
      userId: 1
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
  const teams = await csvtojson().fromFile(`${__dirname}/data/teams.csv`)

  if (await prisma.team.count() > 2) {
    return
  }

  teams.forEach(async (team, index) => {
    try {

      await prisma.team.upsert({
        where: {
          id: Number(team.id)
        },
        update: {
          name: team.name,
          modalityId: Number(team.modalityId),
          groupId: Number(team.groupId),
          genreId: Number(team.genreId),
          students: {
            create: [
              { studentId: 'C123123' },
              { studentId: 'C111222' }
            ]
          }
        },
        create: {
          id: Number(team.id),
          name: team.name,
          modalityId: Number(team.modalityId),
          groupId: Number(team.groupId),
          genreId: Number(team.genreId),
          students: {
            create: [
              { studentId: 'C123123' },
              { studentId: 'C111222' }
            ]
          }
        }
      })
      console.log(`${team.name} atualizado com sucesso!`)
    } catch (error) {
      console.log(error + team.name)
    }
  })

}

async function createGroups() {

  // const groups = [{ id: 1, name: 'turma test', codcur: 20, codper: 1 }]
  const groups = await csvtojson().fromFile(`${__dirname}/data/groups.csv`)
  groups.forEach(async (group, index) => {
    try {

      await prisma.group.upsert({
        where: {
          id: Number(group.id)
        },
        update: {
          name: group.name,
          codcur: Number(group.codcur),
          codper: Number(group.codper)
        },
        create: {
          id: Number(group.id),
          name: group.name,
          codcur: Number(group.codcur),
          codper: Number(group.codper)
        }
      })
      // console.log(`${index + 1} - ${group.name} atualizado com sucesso!`)
    } catch (error) {
      console.log(group)
    }
  })

}

async function createModalities() {
  const modalities = await csvtojson().fromFile(`${__dirname}/data/modalities.csv`)
  modalities.forEach((async (modality, index) => {
    try {

      await prisma.modality.upsert({
        where: {
          id: Number(modality.id)
        },
        update: {
          name: modality.name,
          membersQuantity: Number(modality.membersQuantity),
          teamsQuantity: Number(modality.teamsQuantity)
        },
        create: {
          id: Number(modality.id),
          name: modality.name,
          membersQuantity: Number(modality.membersQuantity),
          teamsQuantity: Number(modality.teamsQuantity)
        }
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


async function createStudents() {

  const fileStudents = `${__dirname}/data/students.csv`
  let students = []
  if (!fs.existsSync(fileStudents)) {
    students = await csvtojson().fromFile(fileStudents)
  } else {
    students = [
      {
        ra: 'C123123',
        name: 'aaluno name',
        codcur: 23,
        codper: 1,
        course: 'MT- Materanal',
        group: 'IMCAM'
      },
      {
        ra: 'C111222',
        name: 'aaluno name2',
        codcur: 23,
        codper: 1,
        course: 'MT- Materanal',
        group: 'IMCAM'
      }
    ]
  }

  students.forEach(async (student, index) => {

    try {

      await prisma.student.upsert({
        where: {
          id: student.ra
        },
        update: {
          name: student.name,
          codcur: Number(student.codcur),
          codper: Number(student.codper),
          course: student.course,
          group: student.group,
        },
        create: {
          id: student.ra,
          name: student.name,
          codcur: Number(student.codcur),
          codper: Number(student.codper),
          course: student.course,
          group: student.group,

        }
      })
    } catch (error) {
      console.log(error)
    }
    // console.log(`${index + 1} - ${student.name} - Atualizado !`)
  })

}