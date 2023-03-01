import moment from "moment";
import { prisma } from "../utils/prisma";

export class Game {

  static async findMany() {
    return await prisma.game.findMany({
      orderBy: {
        // name:'asc'
      },
      // take: 5
    })
  }

  static async findUnique(id: number) {
    return await prisma.game.findUnique({
      where: { id }
    })
  }

  static async create(data: any) {
    return await prisma.game.create({data})
  }

  static async update(id: number, data: any) {

    return await prisma.game.update({
      where: { id },
      data,
    })
  }

  static async delete(id: number) {
    return await prisma.game.delete({
      where: { id }
    })
  }
}