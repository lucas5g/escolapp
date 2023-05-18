import { GameRepository } from "../repositories/GameRepository";
import { GameType, gameSchema } from "../utils/schemas";


export class GameService {

  static async findMany() {
    const games = await GameRepository.findMany()
    return games.map( game => {
      return {
        ...game, 
        teams: game.gameTeam.map( gameTeam => {
          return {
            id: gameTeam.teamId,
            name: gameTeam.team.name
          }
        }),
        gameTeam:undefined
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

  static async update(id: number, data: any) {
    const game = gameSchema.parse(data)
    return await GameRepository.update(id, game)
  }

  static async delete(id: number) {
    return await GameRepository.delete(id)
  }
}