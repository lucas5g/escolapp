import { StudentRepository } from "../repositories/StudentRepository"

export class StudentService{
  static async findMany(){
    return StudentRepository.findMany()
  }
}