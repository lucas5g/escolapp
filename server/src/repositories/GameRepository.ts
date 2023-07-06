import moment from "moment";
import { ConfigService } from "../services/ConfigService";
import { prisma } from "../utils/prisma";
import { GameFilterType, GameType } from "../utils/schemas";

export class GameRepository {


  static async findMany(filter: GameFilterType) {
    // console.log({filter})
    // console.log('mais 1', moment(filter.date).add(1, 'day').toDate())
    return await prisma.game.findMany({
      where:filter.userId ? {
        date:{
         gte:filter.date,
         lte:  moment(filter.date).add(1, 'days').toDate()
        },
        userId: filter.userId
      }:{},
      orderBy: [
        { date: 'asc' },
        { startHours: 'asc' }
      ],
      include: {
        modality: true,
        place: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        },
      }
    })

  }

  static async findById(id: number) {
    return await prisma.game.findUnique({
      where: { id }
    })
  }

  static async findByColumn(columm:string, value:any){
    return prisma.game.findFirst({
      where:{
        [columm]:value
      }
    })
  }

  static async create(data: GameType) {
    return await prisma.game.create({
      data
    })
  }

  static async update(id: number, data: GameType) {
  
    await ConfigService.clearCaches()


    return await prisma.game.update({
      where: { id },
      data
    })
  }

  static async delete(id: number) {
    return await prisma.game.delete({
      where: { id },

    })
  }
}