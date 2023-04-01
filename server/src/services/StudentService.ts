import { z } from "zod"
import { StudentRepository } from "../repositories/StudentRepository"

export class StudentService{

  static schemaQuery = z.object({
    codcur:z.coerce.number(),
    codper:z.coerce.number()
  })

  static async findMany(query?:z.infer<typeof this.schemaQuery> ){
    if(query?.codcur || query?.codper){
      const where = this.schemaQuery.parse(query)
      return await StudentRepository.findMany(where)
    }

    return await StudentRepository.findMany()
  }

  static async findById(id:string){
    return await StudentRepository.findById(id)
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