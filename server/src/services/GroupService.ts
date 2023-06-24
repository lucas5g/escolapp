import { GroupRepository } from "../repositories/GroupRepository";
import { TeamRepository } from "../repositories/TeamRepository";
import { cache } from "../utils/cache";
import { groupSchema } from "../utils/schemas";
import { ConfigService } from "./ConfigService";
import { StudentService } from "./StudentService";

export class GroupService{

  static async findMany(filter: any){


    if(cache.has('groups')){
      return cache.get('groups')
    }

    const groupsWithoutQuantityStudents = await GroupRepository.findMany()
    const students = await StudentService.findMany({unity: 'contagem' })
    const groups = groupsWithoutQuantityStudents.map(group => {
      return {
        ...group,
        quantity: students.filter(student => student.group === group.name).length
      }
    })

    cache.set('groups', groups)
    return groups

  }

  static async findById(id:number){
    return await GroupRepository.findById(id)
  }

  static async create(data:any){
    ConfigService.clearCaches()

    const group = groupSchema.parse(data)
    if(await GroupRepository.findByColumn('name', group.name)){
      throw new Error(`A turma ${group.name} já foi cadastrado!.`)
    }


    return await GroupRepository.create(group)
  }

  static async update(id:number, data:any){
    ConfigService.clearCaches()

    const group = groupSchema.parse(data)
    return await GroupRepository.update(id, group)
  }

  static async delete(id:number){
    if(await TeamRepository.findByColumn('groupId', id)){
      throw new Error('Não foi possível deletar :(\nPossui Equipes com essa turma.')
    }
    // console.log({id})
    return await GroupRepository.delete(id)
  }
}