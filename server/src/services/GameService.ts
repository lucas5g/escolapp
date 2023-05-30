import { GameRepository } from "../repositories/GameRepository";
import { GameType, gameSchema } from "../utils/schemas";


export class GameService {

  static async findMany() {
    const games = await GameRepository.findMany()

    return games.map(game => {
      return {
        ...game,
        hours: `${game.startHours} - ${game.endHours}`
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