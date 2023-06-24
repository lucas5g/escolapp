import { UnityRepository } from "../repositories/UnityRepository";

export class UnityService{
  
  static async findMany(){
    return await UnityRepository.findMany()
  }

  static async findById(id:number){
    return await UnityRepository.findById(id)
  }

  static async update(id:number, data:any){
    return await UnityRepository.update(id, data)
  }

  static async create(data:any){
    return await UnityRepository.create(data)
  }

  static async delete(id:number){
    return await UnityRepository.delete(id)
  }
}