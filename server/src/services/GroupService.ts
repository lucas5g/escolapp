import { GroupRepository } from "../repositories/GroupRepository";

export class GroupService{
  static async findMany(){
    return await GroupRepository.findMany()
  }

  static async findById(id:number){
    return await GroupRepository.findById(id)
  }

  static async create(data:any){
    return await GroupRepository.create(data)
  }

  static async update(id:number, data:any){
    return await GroupRepository.update(id, data)
  }

  static async delete(id:number){
    return await GroupRepository.delete(id)
  }
}