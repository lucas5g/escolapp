import moment from "moment";
import { prisma } from "../utils/prisma";
import { GameBodyType } from "../utils/schemas";

export class Game {

  static async findMany() {
    return await prisma.game.findMany({
      orderBy: [
        {date:'asc'},
        {startHours:'asc'}
      ]
      // include:{
      //   Place:true
      // }
      // take: 5
    })
  }

  static async findUnique(id: number) {
    return await prisma.game.findUnique({
      where: { id }
    })
  }

  static async create(data: GameBodyType) {
    return await prisma.game.create({
      data: {
        ...data,
        date: new Date(data.date)
      }
    })
  }

  static async update(id: number, data: GameBodyType) {
    return await prisma.game.update({
      where: { id },
      data
    })
  }

  static async delete(id: number) {
    return await prisma.game.delete({
      where: { id }
    })
  }
}