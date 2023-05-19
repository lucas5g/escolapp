import { prisma } from "../utils/prisma";
import { GameType } from "../utils/schemas";

export class GameRepository {

  static async findMany() {
    return await prisma.game.findMany({
      orderBy: [
        { date: 'asc' },
        { startHours: 'asc' }
      ],
      include: {
        gameTeam: {
          select: {
            id: true,
            gameId: true,
            teamId: true,
            team: {
              select: {
                name: true
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
      return { teamId: id }
    })
    return await prisma.game.create({
      data: {
        date: data.date,
        startHours: data.startHours,
        endHours: data.endHours,
        placeId: data.placeId,
        modalityId: data.modalityId,
        userId: data.userId,
        gameTeam: {
          createMany: {
            data: teams
          }
        }
      },
      include: {
        gameTeam: true
      }
    })
  }

  static async update(id: number, data: GameType) {

    const gamaTeams = await prisma.gameTeam.findMany({
      where: {
        gameId: id
      },
      select: {
        id: true
      }
    })

    gamaTeams.forEach(async (gameTeam, index) => {
      await prisma.gameTeam.update({
        where: {
          id: gameTeam.id
        },
        data: {
          gameId: id,
          teamId: data.teams[index]
        }
      })
    })

    const game = await prisma.game.update({
      where: { id },
      data: {
        date: data.date,
        startHours: data.startHours,
        endHours: data.endHours,
        userId: data.userId,
        placeId: data.placeId,
        modalityId: data.placeId,
      },
      include: {
        gameTeam: true
      }
    })

    return {
      ...game,
      // createdAt:undefined,
      // updatedAt:undefined,
      gameTeam: undefined,
      teams: game.gameTeam.map(gameTeam => gameTeam.teamId)
    }
  }

  static async delete(id: number) {
    return await prisma.game.delete({
      where: { id },
      
    })
  }
}