import { SetupRepository } from "../repositories/SetupRepository"
import { setupSchema } from "../utils/schemas"

export class SetupServive{

  static async findMany({unityId}: {unityId:number}){
    return await SetupRepository.findMany({unityId})
  }

  static async findById(id:number){
    return await SetupRepository.findById(id)
  }

  static async findByColumn(){

  }

  static async update(id:number, data:any){
    const setup = setupSchema.parse(data)
    return await SetupRepository.update(id, setup)
  }

  static async create(data:any){
    const setup = setupSchema.parse(data)
    return await SetupRepository.create(setup)
  }

  static async delete(id:number){
    return await SetupRepository.delete(id)
  }
}