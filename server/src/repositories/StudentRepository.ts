import { prisma } from "../utils/prisma";

export class StudentRepository {

  static async findMany(where?:any){
    return await prisma.student.findMany({
      where,
      orderBy:{
        name:'asc'
      }
    })
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