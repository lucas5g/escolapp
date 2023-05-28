import { StudentRepository } from "../repositories/StudentRepository"
import { StudentQueryType, studentQuerySchema } from "../utils/schemas"

interface StudentInterface{
  ra: string 
  name: string 
  group: string 
}
export class StudentService {

  static async findMany(query?: StudentQueryType) {

    const { group } = studentQuerySchema.parse(query)
    const students = await StudentRepository.findMany() as StudentInterface[]

    if(group){
      return students.filter( student => student.group === group)
    }
    
    return students
    
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