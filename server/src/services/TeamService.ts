import { GameRepository } from "../repositories/GameRepository"
import { TeamRepository } from "../repositories/TeamRepository"
import { cache } from "../utils/cache"
import { TeamType, teamQuerySchema, teamSchema } from "../utils/schemas"
import { Prisma } from "@prisma/client"
import { StudentService } from "./StudentService"

export class TeamService {
  static async findMany(data?: teamQuerySchema) {
    const filter = teamQuerySchema.parse(data)
    
    const teams = await TeamRepository.findMany({modalityId: filter.modalityId})
    return teams
    const students = await StudentService.findMany({unity: 'contagem'})

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

    const games = await GameRepository.findMany({})

    const gameTeam = games.find( game => {
      const teams = game.teams as Prisma.JsonArray
      return teams.find((team:any) => team.id === id)
    })

    if(gameTeam){
      throw new Error('Não foi possível deletar :(\nPossui jogos com essa equipe.')
    }

    return await TeamRepository.delete(id)
  }
}