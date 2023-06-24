import { GameRepository } from "../repositories/GameRepository"
import { PlaceRepository } from "../repositories/PlaceRepository"
import { PlaceFilterType, placeFilterSchema, placeSchema } from "../utils/schemas"

export class PlaceService {

  static async findMany(data:PlaceFilterType) {

    const filter = placeFilterSchema.parse(data)
    return await PlaceRepository.findMany(filter)
  }

  static async findById(id: number) {
    return await PlaceRepository.findById(id)
  }

  static async create(data: any) {
    const place = placeSchema.parse(data)

    if (await PlaceRepository.findByKey('name', place.name)) {
      throw new Error(`O local ${place.name} já foi cadastrado!`)
    }

    return await PlaceRepository.create(place)
  }

  static async update(id: number, data: any) {
    const place = placeSchema.parse(data)
    return await PlaceRepository.update(id, place)
  }

  static async delete(id: number) {

    if (await GameRepository.findByColumn('placeId', id)) {
      throw new Error('Não foi possível deletar :(\nPossui Jogos com este local.')
    }

    return await PlaceRepository.delete(id)
  }
}