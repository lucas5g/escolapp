import { PointRepository } from "../repositories/PointRepository";

export class PointService{
  static async findMany(){
    return await PointRepository.findMany()
  }
}