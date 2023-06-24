import { prisma } from "../utils/prisma";

export class UnityRepository{

  static async findMany(){
    return await prisma.unity.findMany()
  }

  static async findById(id:number){
    return await prisma.unity.findFirst({
      where:{id}
    })
  }

  static async update(id:number, data:any){
    return await prisma.unity.update({
      where:{id},
      data
    })
  }

  static async create(data:any){
    return await prisma.unity.create({
      data
    })
  }

  static async delete(id:number){
    return await prisma.unity.delete({
      where:{id}
    })
  }

}