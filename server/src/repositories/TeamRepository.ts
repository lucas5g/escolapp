import { prisma } from "../utils/prisma"

export class TeamRepository {
  static async findMany(where: any) {
    return await prisma.team.findMany({
      where,
      orderBy: {
        name: 'asc'
      },
    })
  }

  static async findById(id: number) {
    return await prisma.team.findUnique({
      where: { id },
    })
  }

  static async findByColumn(column: string, value: any) {
    return await prisma.team.findFirst({
      where: {
        [column]: value
      }
    })
  }
  static async create(data: any) {

    return await prisma.team.create({ data })

  }

  static async update(id: number, data: any) {

    return await prisma.team.update({
      where: { id },
      data
    })
  }

  static async delete(id: number) {
    return await prisma.team.delete({
      where: { id }
    })
  }
}