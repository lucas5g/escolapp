import { GroupRepository } from "../repositories/GroupRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { TeamRepository } from "../repositories/TeamRepository";
import { groupSchema } from "../utils/schemas";
import { ConfigService } from "./ConfigService";

export class GroupService{
  static async findMany(){
    const groups = await GroupRepository.findMany()
    const students = await StudentRepository.findMany()

    return groups.map(group => {
      return {
        ...group,
        quantity: students.filter(student => student.group === group.name).length
      }
    })

  }

  static async findById(id:number){
    return await GroupRepository.findById(id)
  }

  static async create(data:any){
    ConfigService.clearCaches()

    const group = groupSchema.parse(data)
    return await GroupRepository.create(group)
  }

  static async update(id:number, data:any){
    ConfigService.clearCaches()

    const group = groupSchema.parse(data)
    return await GroupRepository.update(id, group)
  }

  static async delete(id:number){
    if(await TeamRepository.findByColumn('groupId', id)){
      throw new Error('Possui Equipes com essa turma.')
    }
    return await GroupRepository.delete(id)
  }
}