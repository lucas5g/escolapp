import { prisma } from "../utils/prisma";

export class Modality {

  static async findMany(){
    return await prisma.modality.findMany({
      orderBy:{
        name:'asc'
      }
    })
  }

  static async findById(id:number) {
    return await prisma.modality.findUnique({
      where: { id }
    })
  }

  static async findByKey(key:string, data:any){
    return await prisma.modality.findUnique({
      where:{
        [key]:data
      }
    })
  }



  static async create(data:any) {
    return await prisma.modality.create({ data })
  }

  static async update(id:number, data:any){
    return await prisma.modality.update({
      where: {id},
      data,
    })
  }

  static async delete(id:number){
    return await prisma.modality.delete({
      where: {id}
    })
  }
}