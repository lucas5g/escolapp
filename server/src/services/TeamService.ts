import { GameRepository } from "../repositories/GameRepository"
import { TeamRepository } from "../repositories/TeamRepository"
import { cache } from "../utils/cache"
import { TeamType, teamQuerySchema, teamSchema } from "../utils/schemas"
import { Prisma } from "@prisma/client"
import { StudentService } from "./StudentService"

export class TeamService {
  static async findMany(data?: teamQuerySchema) {
    const teamsCache = `teams_${data?.modalityId}`
    if(cache.has(teamsCache)){
      return cache.get(teamsCache) as any[]
    }

    const filter = teamQuerySchema.parse(data)    
    
    const teamsWithoutStudents = await TeamRepository.findMany({modalityId: filter.modalityId})
    const students = await StudentService.findMany({unity: 'contagem'})

    const teams = teamsWithoutStudents.map(team => {
      const teamStudents = team.students as Prisma.JsonArray
      return {
        ...team,
        students: teamStudents.map( ra => {
          return students.find(student => student.ra === ra )
        })
        
      }
    })

    cache.set(teamsCache, teams)
    return teams
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: TeamType) {
    cache.flushAll()

    const team = teamSchema.parse(data)

    if (await TeamRepository.findByColumn('name', team.name)) {
      throw new Error(`Já foi cadastrado o time com o nome ${team.name}!`)
    }

    return await TeamRepository.create(team)
  }

  static async update(id: number, data: any) {
    cache.flushAll()

    const team = teamSchema.parse(data)
    return await TeamRepository.update(id, team)
  }

  static async delete(id: number) {
    cache.flushAll()

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