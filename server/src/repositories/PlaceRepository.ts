import { prisma } from "../utils/prisma";

export class PlaceRepository {

  static async findMany(filter:any){
    return await prisma.place.findMany({
      orderBy:{
        name:'asc'
      },
      where:filter
    })
  }

  static async findById(id:number) {
    return await prisma.place.findUnique({
      where: { id }
    })
  }


  static async findByKey(key:string, data:any){
    return await prisma.place.findUnique({
      where:{
        [key]:data
      }
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