import { PlaceRepository } from "../repositories/PlaceRepository"

export class PlaceService{

  static async findMany(){
    return await PlaceRepository.findMany()
  }

  static async findById(id:number){
    return await PlaceRepository.findById(id)
  }

  static async create(data:any){

    if(await PlaceRepository.findByKey('name', data.name)){
      throw new Error(`O local ${data.name} já foi cadastrado!`)
    }

    return await PlaceRepository.create(data)
  }

  static async update(id:number, data:any){
    return await PlaceRepository.update(id, data)
  }

  static async delete(id:number){
    return await PlaceRepository.delete(id)
  }
}