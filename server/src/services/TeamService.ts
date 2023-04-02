import { z } from "zod"
import { StudentRepository } from "../repositories/StudentRepository"
import { TeamRepository } from "../repositories/TeamRepository"

const teamSchema = z.object({
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number(),
  studentsSelected: z.array(z.string())
})

const teamQuerySchema = z.object({
  modalityId: z.coerce.number().optional()
})

export type teamType = z.infer<typeof teamSchema>
type teamQuerySchema = z.infer<typeof teamQuerySchema>

export class TeamService {
  static async findMany(data?: teamQuerySchema) {
    
    const teams = await TeamRepository.findMany(data ? teamQuerySchema.parse(data): {})

    const teamsWithStudents = teams.map( team => {
      return {
        ...team,
        TeamStudent:undefined,
        // students: team.TeamStudent.map(teamStudent => {
        //   return {
        //     id: teamStudent.student.id,
        //     name: teamStudent.student.name
        //   }
        // })
        students: team.TeamStudent.map( teamStudent =>  teamStudent.student.name)
      }
    })
    
    return teamsWithStudents
  }

  static async findById(id: number) {
    return await TeamRepository.findById(id)
  }

  static async create(data: teamType) {
    const team = teamSchema.parse(data)

    if (await TeamRepository.findByColumn('name', team.name)) {
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