import { StudentRepository } from "../repositories/StudentRepository"
import { StudentFilterType, studentFilterSchema } from "../utils/schemas"

interface StudentInterface {
  ra: string
  name: string
  group: string
  unity: string
}
export class StudentService {

  static async findMany(data: StudentFilterType) {

    const filter = studentFilterSchema.parse(data)
    return await StudentRepository.findMany(filter)
    // const students = await StudentRepository.findMany() as StudentInterface[]

    // if (group) {
    //   return students.filter(student => student.group === group)
    // }

    // return students

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