import moment from "moment";
import { GameRepository } from "../repositories/GameRepository";
import { GameType, gameFilterSchema, gameSchema } from "../utils/schemas";
import { StudentRepository } from "../repositories/StudentRepository";
import { Prisma } from "@prisma/client";
import { TeamRepository } from "../repositories/TeamRepository";


export class GameService {

  static async findMany(data:any) {
    // const filter = data ? gameFilterSchema.parse(data) : {}
    const filter = gameFilterSchema.parse(data)

    const games = await GameRepository.findMany(filter)
    const students = await StudentRepository.findMany() 
    const teams = await TeamRepository.findMany({})

    return games.map(game => {
      const gameTeams = game.teams as Prisma.JsonArray
      return {
        ...game,
        datetime: `${moment(game.date).format('DD/MM')} | ${game.startHours} - ${game.endHours}`,
        teams: gameTeams?.map((team: any) => {
          const teamFind = teams.find(row => row.id === team.id)
          const studentsJson = teamFind?.students as Prisma.JsonArray
          return {
            ...teamFind,
            goals: team.goals,
            points: team.points,
            students: studentsJson.map(ra => {
              return students.find(student => student.ra === ra)
            })
          }
        }),
      }
    })
  }

  static async findById(id: number) {
    return await GameRepository.findById(id)
  }

  static async create(data: GameType) {
    const game = gameSchema.parse(data)
    return await GameRepository.create(game)
  }

  static async update(id: number, data: GameType) {
    const game = gameSchema.parse(data)
    return await GameRepository.update(id, game)
  }

  static async delete(id: number) {
    return await GameRepository.delete(id)
  }
}