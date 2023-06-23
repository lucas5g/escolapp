import { games } from "googleapis/build/src/apis/games"
import { GameRepository } from "../repositories/GameRepository"
import { StudentRepository } from "../repositories/StudentRepository"
import { TeamRepository } from "../repositories/TeamRepository"
import { cache } from "../utils/cache"
import { TeamType, teamQuerySchema, teamSchema } from "../utils/schemas"
import { Prisma } from "@prisma/client"

export class TeamService {
  static async findMany(data?: teamQuerySchema) {

    // if(cache.has('teams')){
    //   return cache.get('teams') as []
    // }

    const students = await StudentRepository.findMany()

    const teams = await TeamRepository.findMany(data ? teamQuerySchema.parse(data) : {})

    const teamsStudents = teams.map(team => {
      const teamStudents = team.students as Prisma.JsonArray
      return {
        ...team,
        students: teamStudents.map( ra => {
          return students.find(student => student.ra === ra )
        })
        
      }
    })

    // cache.set('teams', teamsStudents)
    return teamsStudents
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: TeamType) {
    cache.del('teams')

    const team = teamSchema.parse(data)

    if (await TeamRepository.findByColumn('name', team.name)) {
      throw new Error(`Já foi cadastrado o time com o nome ${team.name}!`)
    }

    return await TeamRepository.create(team)
  }

  static async update(id: number, data: any) {
    cache.del('teams')

    const team = teamSchema.parse(data)
    return await TeamRepository.update(id, team)
  }

  static async delete(id: number) {

    // const games = await GameRepository.findMany({})
    // games.find( game => game)
    // if(games.find)

    // if(await GameRepository.findByColumn('teamId', id)){
    //   throw new Error('Não foi possível deletar :(\nPossui jogos com essa equipe.')
    // }

    return await TeamRepository.delete(id)
  }
}