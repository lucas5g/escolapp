import { StudentRepository } from "../repositories/StudentRepository"

export class StudentService{

  static async findMany(){
    return await StudentRepository.findMany()
  }

  static async findByRa(ra:string){
    return await StudentRepository.findByRa(ra)
  }

  static async create(data:any){
    return await StudentRepository.create(data)
  }

  static async update(ra:string, data:any){
    return await StudentRepository.update(ra, data)
  }

  static async delete(ra:string){
    return await StudentRepository.delete(ra)
  }
}