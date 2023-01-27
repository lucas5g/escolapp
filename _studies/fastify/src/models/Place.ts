import { prisma } from "../utils/prisma";

export class Place {

  static async findMany(){
    return await prisma.place.findMany({
      orderBy:{
        name:'asc'
      }
    })
  }

  static async findUnique(id:number) {
    return await prisma.place.findUnique({
      where: { id }
    })
  }

  static async create(data:any) {
    return await prisma.place.create({ data })
  }

  static async update(id:number, data:any){
    return await prisma.place.update({
      where: {id},
      data,
    })
  }

  static async delete(id:number){
    return await prisma.place.delete({
      where: {id}
    })
  }
}