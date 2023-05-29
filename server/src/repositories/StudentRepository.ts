import { cache } from "../utils/cache";
import { googleSheets } from "../utils/google-sheets";
import { prisma } from "../utils/prisma";
import { StudentQueryType } from "../utils/schemas";

interface StudentInterface{
  ra:string 
  name:string 
  group:string 
  // course:string 
  // codcur:number 
  // codper:number  

}

export class StudentRepository {

  static async findMany(){

    if(cache.has('students')){
      return cache.get('students') as StudentInterface[]
    }

    const students = await googleSheets({range:'all!a:g'}) as StudentInterface[]

    cache.set('students', students)
    return students

  }

  // static async findById(id:string) {
  //   return await prisma.student.findUnique({
  //     where: {id}
  //   })
  // }

  // static async create(data:any) {
  //   return await prisma.student.create({ data })
  // }

  // static async update(id:string, data:any){
  //   return await prisma.student.update({
  //     where: {id},
  //     data,
  //   })
  // }

  // static async delete(id:string){
  //   return await prisma.student.delete({
  //     where: {id}
  //   })
  // }
}