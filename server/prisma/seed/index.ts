import { PrismaClient } from '@prisma/client'
import csvtojson from 'csvtojson'
import bcrypt from 'bcrypt'
import { setTimeout } from 'timers/promises'


const prisma = new PrismaClient()

createModalities()
createGroups() 
createUsers()
createPlaces()
createStudents()
createGenres()
// createTeams()
createGame()
createUser()
// async function createStudents(){

// }
async function createUser(){
  await prisma.user.upsert({
    where:{
      email: 'test@mail.com',
    },
    update:{
      name:'test'
    },
    create:{
      email:'test@mail.com',
      password: await bcrypt.hash('qweqwe', 12),
      name:'test'
    }
  })
}

async function createUsers(){
  const users = await csvtojson().fromFile(`${__dirname}/data/users.csv`)
  await prisma.user.upsert({
    where:{
      email: 'test@mail.com',
    },
    update:{
      name:'test'
    },
    create:{
      email:'test@mail.com',
      password: await bcrypt.hash('qweqwe', 12),
      name:'test'
    }
  })
}

async function createGame(){
  await prisma.game.create({
    data:{
      date:'2023-03-15T04:29:51.961Z',
      startHours:'08:00',
      endHours:'09:00'
    }
  })
}

async function createGenres() {
  const genres = [
    {id:2, name:'FEM'},
    {id:1, name:'MAS'},
    {id:3, name:'MISTO'}
  ]

  genres.forEach(async (row) => {
    await prisma.genre.upsert({
      where: {
        id: row.id
      },
      update: row,
      create:row
    })
    console.log(`${row.name} atualizado com sucesso!`)
  })
}


async function createGroups() {

  const groups = [{id: 1, name: 'turma test', codcur:20, codper:1 }]
  // const groups = await csv().fromFile(`${__dirname}/data/groups-custom.csv`)

  groups.forEach(async (row, index) => {
    await prisma.group.upsert({
      where: {
        id: row.id
        // id: Number(row.id_turma)
      },
      update: row, 
      create: row
    })
    console.log(`${index + 1} - ${row.name} atualizado com sucesso!`)
  })

}


async function createModalities() {
  const modalities = [
    {id: 1, name: 'modalidade test', membersQuantity: 10, teamsQuantity: 2}
  ]
  modalities.forEach((async (modality, index) => {
    try {

      await prisma.modality.upsert({
        where: {
          id: modality.id
        },
        update: modality,
        create: modality
      })
      console.log(`${index + 1} ${modality.name} - Atualizado!`)
    } catch {
      console.log(`Erro no cadastro`, modality)
    }
  }))
}

async function createPlaces() {
  const places = [
    {id:1, name:'place test'}
  ]

  places.forEach((async (place) => {
    await prisma.place.upsert({
      where:{
        id: place.id
      },
      update: place,
      create: place
    })
  }))
}

async function createStudents() {
  // const students = await csv().fromFile(`${__dirname}/data/students.csv`)
  const students = [
    {
      ra: 'c123123',
      name: 'aluno name',
      codcur:23,
      codper: 1,
      course: 'MT- Materanal',
      group: 'IMCAM'
    }
  ]

  students.forEach(async (student, index) => {
    // return console.log(`test ${index}`)
    // await setTimeout(100 * index)

    await prisma.student.upsert({
      where: {
        ra: student.ra
      },
      update: student,
      create: student
    })
    return console.log(`${index + 1} - ${student.name} - Atualizado !`)
  })

}

// async function createStudents() {
//   // const students = await csv().fromFile(`${__dirname}/data/students.csv`)
//   const students = [
//     {}
//   ]

//   students.forEach(async (student, index) => {
//     // return console.log(`test ${index}`)
//     // await setTimeout(100 * index)

//     await prisma.student.upsert({
//       where: {
//         ra: student.ra
//       },
//       update: {
//         name: student.nome_aluno,
//         codcur: Number(student.codcur),
//         codper: Number(student.codper),
//         course: student.matriz_curricular,
//         group: student.turma,
//       },
//       create: {
//         ra: student.ra,
//         name: student.nome_aluno,
//         codcur: Number(student.codcur),
//         codper: Number(student.codper),
//         course: student.matriz_curricular,
//         group: student.turma,

//       }
//     })
//     return console.log(`${index + 1} - ${student.nome_aluno} - Atualizado !`)
//   })

// }