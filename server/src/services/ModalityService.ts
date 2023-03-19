import { ModalityRepository } from "../repositories/ModalityRepository"

export class ModalityService{

  static async findMany(){
    return await ModalityRepository.findMany()
  }

  static async findById(id:number){
    return await ModalityRepository.findById(id)
  }

  static async create(data:any){

    if(await ModalityRepository.findByKey('name', data.name)){
      throw new Error(`Modalidade ${data.name} já foi cadastrada!`)
    }

    return ModalityRepository.create(data)
  }

  static async update(id:number, data:any){
    return await ModalityRepository.update(id, data)
  }

  static async delete(id:number){
    return await ModalityRepository.delete(id)
  }
}