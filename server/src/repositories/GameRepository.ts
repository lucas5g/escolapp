import { prisma } from "../utils/prisma";
import { GameType } from "../utils/schemas";

export class GameRepository {

  static async findMany() {
    return await prisma.game.findMany({
      orderBy: [
        {date:'asc'},
        {startHours:'asc'}
      ],
      include:{
        gameTeam:{
          select:{
            id:true,
            gameId:true,
            teamId:true,
            team:{
              select:{
                name:true
              }
            }
          },
        }
      }
    })
  }

  static async findById(id: number) {
    return await prisma.game.findUnique({
      where: { id }
    })
  }

  static async create(data: GameType) {
    const teams = data.teams.map(id => {
      return { teamId: id}
    })
    return await prisma.game.create({
      data:{
        date: data.date,
        startHours: data.startHours,
        endHours: data.endHours,
        placeId: data.placeId,
        modalityId: data.modalityId,
        userId: data.userId,
        gameTeam:{
          createMany:{
            data:teams
          }
        }
      },
      include:{
        gameTeam:true
      }
    })
  }

  static async update(id: number, data: any) {
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