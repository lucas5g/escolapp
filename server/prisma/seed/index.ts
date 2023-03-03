import { PrismaClient } from '@prisma/client'

import csv from 'csvtojson'
import bcrypt from 'bcrypt'
import { idToStringProfile } from '../../src/utils/id-to-string-profile'
import { setTimeout } from 'timers/promises'


const prisma = new PrismaClient()

// createGroups() 
// createUsers()
// createModalities()
// createPlaces()
// createStudents()
// createGenres()
createTeams()
async function createGenres() {
  const genres = await csv().fromFile(`${__dirname}/data/genres.csv`)

  genres.forEach(async (row) => {
    await prisma.genre.upsert({
      where: {
        id: Number(row.id_genero)
      },
      update: {
        name: row.nome_genero,
      },
      create: {
        id: Number(row.id_genero),
        name: row.nome_genero,
      }
    })
    console.log(`${row.nome_genero} atualizado com sucesso!`)
  })
}

async function createTeams() {

  const teams = await csv().fromFile(`${__dirname}/data/teams.csv`)
  teams.forEach(async (row, index) => {
    await setTimeout(index * 100)
    await prisma.team.upsert({
      where:{
        id: Number(row.id_equipe)
      },
      update:{
        name: row.nome_equipe,
        modalityId: Number(row.id_modalidade),
        groupId: Number(row.id_turma),
        genreId: Number(row.id_genero)
      },
      create:{
        id: Number(row.id_equipe),
        name: row.nome_equipe,
        modalityId: Number(row.id_modalidade),
        groupId: Number(row.id_turma),
        genreId: Number(row.id_genero)
      }
    })
    console.log(`${row.nome_equipe} atualizado com sucesso!`)
  })

}

async function createGroups() {

  const groups = await csv().fromFile(`${__dirname}/data/groups-custom.csv`)

  groups.forEach(async (row, index) => {
    await prisma.group.upsert({
      where: {
        id: Number(row.id_turma)
      },
      update: {
        name: row.nome_turma,
        codcur: Number(row.codcur),
        codper: Number(row.codper)
      },
      create: {
        id: Number(row.id_turma),
        name: row.nome_turma,
        codcur: Number(row.codcur),
        codper: Number(row.codper)
      }
    })
    console.log(`${row.nome_turma} atualizado com sucesso!`)
  })

}

// async function createUsers() {

//   const users = await csv().fromFile(`${__dirname}/data/users.csv`)

//   users.forEach(async (user, index) => {
//     // return console.log({
//     //   ...user,
//     //   password: await bcrypt.hash(user.senha, 10)
//     // })
//     await prisma.user.upsert({
//       where: {
//         email: user.email || `${user.usuario.toLowerCase()}@santoagostinho.com.br`,
//       },
//       update: {
//         name: user.nome,
//         profile: idToStringProfile(user.id_perfil),
//         password: await bcrypt.hash(user.senha, 10),

//       },
//       create: {
//         name: user.nome,
//         email: user.email || `${user.usuario.toLowerCase()}@santoagostinho.com.br`,
//         password: await bcrypt.hash(user.senha, 10),
//         profile: idToStringProfile(user.id_perfil)
//       }
//     })
//     console.log(`${user.nome} atualizado com sucesso!`)
//   })
// }

async function createModalities() {
  const modalities = await csv().fromFile(`${__dirname}/data/modalities.csv`)

  modalities.forEach((async (modality, index) => {
    try {

      await prisma.modality.upsert({
        where: {
          id: Number(modality.id_modalidade)
        },
        update: {
          name: modality.nome_modalidade,
          membersQuantity: Number(modality.qtd_integrantes),
          teamsQuantity: Number(modality.qtd_equipes)
        },
        create: {
          id: Number(modality.id_modalidade),
          name: modality.nome_modalidade,
          membersQuantity: Number(modality.qtd_integrantes),
          teamsQuantity: Number(modality.qtd_equipes)
        }
      })
    } catch {
      console.log(`Erro no cadastro`, modality)
    }
  }))
}

async function createPlaces() {
  const places = await csv().fromFile(`${__dirname}/data/places.csv`)

  places.forEach((async (place) => {
    await prisma.place.upsert({
      where: {
        name: place.nome_local
      },
      update: {
        name: place.nome_local
      },
      create: {
        name: place.nome_local,
      }
    })
  }))
}

async function createStudents() {
  const students = await csv().fromFile(`${__dirname}/data/students.csv`)

  students.forEach(async (student, index) => {
    // return console.log(`test ${index}`)
    await setTimeout(100 * index)
    
    await prisma.student.upsert({
      where: {
        ra: student.ra
      },
      update: {
        name: student.nome_aluno,
        codcur: Number(student.codcur),
        codper: Number(student.codper),
        course: student.matriz_curricular,
        group: student.turma,
      },
      create: {
        ra: student.ra,
        name: student.nome_aluno,
        codcur: Number(student.codcur),
        codper: Number(student.codper),
        course: student.matriz_curricular,
        group: student.turma,
        
      }
    })
    return console.log(`${index+1} - ${student.nome_aluno} - Atualizado !`)
  })
  
}