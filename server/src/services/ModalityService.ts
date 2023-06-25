import { ModalityRepository } from "../repositories/ModalityRepository"
import { TeamRepository } from "../repositories/TeamRepository"
import { ModalityInterface, modalitySchema } from "../utils/schemas"

export class ModalityService{

  static async findMany({unityId}: {unityId:number}|any){
    return await ModalityRepository.findMany({unityId})
  }

  static async findById(id:number){
    return await ModalityRepository.findById(id)
  }

  static async create(data:ModalityInterface){

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
    if(await TeamRepository.findByColumn('modalityId', id)){
      throw new Error('Não foi possível deletar :(\nPossui Equipes com essa modalidade.')
    }
    return await ModalityRepository.delete(id)
  }
}