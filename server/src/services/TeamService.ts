import { TeamRepository } from "../repositories/TeamRepository"

export class TeamService {
  static async findMany() {
   return await TeamRepository.findMany()
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: any) {
    return await TeamRepository.create(data)
  }

  static async update(id: number, data: any) {
    return await TeamRepository.update(id, data)
  }

  static async delete(id: number) {
    return await TeamRepository.delete(id)
  }
}