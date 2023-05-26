import { googleSheets } from "../utils/google-sheets";
import { prisma } from "../utils/prisma";
import { StudentQueryType } from "../utils/schemas";

interface StudentInterface{
  ra:string 
  name:string 
  group:string 
  course:string 
  codcur:number 
  codper:number  

}

export class StudentRepository {

  static async findMany(where?:StudentQueryType){

    const students = await googleSheets() as any[]

    if(!where?.codcur && !where?.codper){
      return students
    }

    return students.filter((student:StudentInterface) => {
      return (
        student.codper === where?.codper &&
        student.codcur === where?.codcur
      ) 
    })

    // return await prisma.student.findMany({
    //   where,
    //   orderBy:{
    //     name:'asc'
    //   }
    // })
  }

  static async findById(id:string) {
    return await prisma.student.findUnique({
      where: {id}
    })
  }

  static async create(data:any) {
    return await prisma.student.create({ data })
  }

  static async update(id:string, data:any){
    return await prisma.student.update({
      where: {id},
      data,
    })
  }

  static async delete(id:string){
    return await prisma.student.delete({
      where: {id}
    })
  }
}