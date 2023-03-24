import { z } from "zod"
import { TeamRepository } from "../repositories/TeamRepository"

export const teamSchema = z.object({
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number()
})
export class TeamService {
  static async findMany(where?:any) {
   return await TeamRepository.findMany(where)
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: any) {
    const team = teamSchema.parse(data)

    if(await TeamRepository.findByColumn('name', team.name)){
      throw new Error(`Já foi cadastrado o time com o nome ${team.name}!`)
    }
    return await TeamRepository.create(team)
  }

  static async update(id: number, data: any) {
    const team = teamSchema.parse(data)
    return await TeamRepository.update(id, team)
  }

  static async delete(id: number) {
    return await TeamRepository.delete(id)
  }
}