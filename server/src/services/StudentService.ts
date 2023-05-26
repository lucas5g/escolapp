import { StudentRepository } from "../repositories/StudentRepository"
import { StudentQueryType, studentQuerySchema } from "../utils/schemas"
export class StudentService {

  static async findMany(query?: StudentQueryType) {

    const where = studentQuerySchema.parse(query)
    return await StudentRepository.findMany(where)
  }

  // static async findById(id: string) {
  //   return await StudentRepository.findById(id)
  // }

  //   static async create(data: any) {
  //     return await StudentRepository.create(data)
  //   }

  //   static async update(ra: string, data: any) {
  //     return await StudentRepository.update(ra, data)
  //   }

  //   static async delete(ra: string) {
  //     return await StudentRepository.delete(ra)
  //   }
}