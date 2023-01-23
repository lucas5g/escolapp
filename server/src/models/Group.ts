import { prisma } from "../utils/prisma";

export class Group {

  static async findMany(){
    return await prisma.group.findMany({
      orderBy:{
        name:'asc'
      },
      // take: 5
    })
  }

  static async findUnique(id:number) {
    return await prisma.group.findUnique({
      where: { id }
    })
  }

  static async create(data:any) {
    return await prisma.group.create({ data })
  }

  static async update(id:number, data:any){

    // return {msg: 'update group', id}

    return await prisma.group.update({
      where: {id},
      data,
    })
  }

  static async delete(id:number){
    return await prisma.group.delete({
      where: {id}
    })
  }
}