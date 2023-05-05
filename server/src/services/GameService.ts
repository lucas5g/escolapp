import { GameRepository } from "../repositories/GameRepository";
import { errorsMessages } from "../utils/errors-messages";
import { GameType, gameSchema } from "../utils/schemas";


export class GameService {

  static async findMany() {
    return await GameRepository.findMany()
  }

  static async findById(id: number) {
    return await GameRepository.findById(id)
  }

  static async create(data: GameType) {
    const body = gameSchema.parse(data)
    return await GameRepository.create(body)
  }

  static async update(id: number, data: any) {
    return await GameRepository.update(id, data)
  }

  static async delete(id: number) {
    return await GameRepository.delete(id)
  }
}