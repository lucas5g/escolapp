import { prisma } from "../utils/prisma";

export class Student {

  static async findMany(){
    return await prisma.student.findMany({
      orderBy:{
        name:'asc'
      }
    })
  }

  static async findUniqueByRa(ra:string) {
    return await prisma.student.findUnique({
      where: {ra }
    })
  }

  static async create(data:any) {
    return await prisma.student.create({ data })
  }

  static async update(ra:string, data:any){
    return await prisma.student.update({
      where: {ra},
      data,
    })
  }

  static async delete(ra:string){
    return await prisma.student.delete({
      where: {ra}
    })
  }
}