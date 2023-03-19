import { TeamRepository } from "../repositories/TeamRepository"
import { teamType } from "../utils/schemas"

export class TeamService {
  static async findMany(where?:any) {
   return await TeamRepository.findMany(where)
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: teamType) {
    if(await TeamRepository.findByColumn('name', data.name)){
      throw new Error(`Já foi cadastrado o time com o nome ${data.name}!`)
    }
    return await TeamRepository.create(data)
  }

  static async update(id: number, data: any) {
    return await TeamRepository.update(id, data)
  }

  static async delete(id: number) {
    return await TeamRepository.delete(id)
  }
}