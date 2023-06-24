import { UnityRepository } from "../repositories/UnityRepository";
import { cache } from "../utils/cache";
import { unitySchema } from "../utils/schemas";

export class UnityService{
  
  static async findMany(){
    if(cache.has('unities')){
      return cache.get('unities') as {id:number, name:string}[]
    }
    const unities = await UnityRepository.findMany()
    cache.set('unities', unities)

    return unities

  }

  static async findById(id:number){
    return await UnityRepository.findById(id)
  }

  static async update(id:number, data:any){
    cache.del('unities')

    const unity = unitySchema.parse(data)
    return await UnityRepository.update(id, unity)
  }

  static async create(data:any){
    cache.del('unities')

    const unity = unitySchema.parse(data)
    return await UnityRepository.create(unity)
  }

  static async delete(id:number){
    return await UnityRepository.delete(id)
  }
}