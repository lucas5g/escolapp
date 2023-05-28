import { GroupRepository } from "../repositories/GroupRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { cache } from "../utils/cache";
import { groupSchema } from "../utils/schemas";

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
    const group = groupSchema.parse(data)
    return await GroupRepository.create(group)
  }

  static async update(id:number, data:any){
    
    const group = groupSchema.parse(data)
    return await GroupRepository.update(id, group)
  }

  static async delete(id:number){
    return await GroupRepository.delete(id)
  }
}