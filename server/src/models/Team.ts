import { prisma } from "../utils/prisma";

export class Team {

  static async findMany() {
    return await prisma.team.findMany({
      orderBy: {
        name: 'asc'
      },
      select:{
        id:true,
        name:true,
        modalityId:true,
        groupId:true,
        genreId:true,
        modality: true,
        group: true, 
        genre: true
      },

      // take: 5
    })
}

  static async findUnique(id: number) {
  return await prisma.team.findUnique({
    where: { id }
  })
}

  static async create(data: any) {
  return await prisma.team.create({ data })
}

  static async update(id: number, data: any){
  return await prisma.team.update({
    where: { id },
    data,
  })
}

  static async delete (id:number) {
  return await prisma.team.delete({
    where: { id }
  })
}
}