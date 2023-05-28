import { ModalityRepository } from "../repositories/ModalityRepository"
import { modalitySchema } from "../utils/schemas"

export class ModalityService{

  static async findMany(){
    return await ModalityRepository.findMany()
  }

  static async findById(id:number){
    return await ModalityRepository.findById(id)
  }

  static async create(data:any){

    const modality = modalitySchema.parse(data)

    if(await ModalityRepository.findByKey('name', data.name)){
      throw new Error(`Modalidade ${data.name} já foi cadastrada!`)
    }

    return ModalityRepository.create(modality)
  }

  static async update(id:number, data:any){

    const modality = modalitySchema.parse(data)

    return await ModalityRepository.update(id, modality)
  }

  static async delete(id:number){
    return await ModalityRepository.delete(id)
  }
}