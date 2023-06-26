import { prisma } from "../utils/prisma";

export class SetupRepository {
  static async findMany(filter:any) {
    return await prisma.setup.findMany({
      where: filter
    })
  }

  static async findById(id:number) {
    return await prisma.setup.findFirst({
      where:{id}
    })
  }

  static async findByColumn() {

  }

  static async update(id:number, data:any) {
    return await prisma.setup.update({
      where: {id},
      data
    })

  }

  static async create(data: any) {
    return await prisma.setup.create({data})
  }

  static async delete(id:number) {
    return await prisma.setup.delete({
      where: {id}
    })
  }
}