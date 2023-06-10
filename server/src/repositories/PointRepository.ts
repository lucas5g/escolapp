import { cache } from "../utils/cache";
import { prisma } from "../utils/prisma";

export class PointRepository {
  static async findMany() {

    if (cache.has('points')) {
      return cache.get('points') as any[]
    }

    const groups = await prisma.group.findMany({
      include: {
        teams: {
          select: {
            id: true
          }
        }
      }
    })

    const games = await prisma.game.findMany()
    const gamesTeams = games.map(game => game.teams).flat()

    const points = groups
      .filter(group => group.teams.length > 0)
      .map(group => {
        return {
          ...group,
          teams: gamesTeams.filter((gameTeam: any) => group.teams.find(team => team.id === gameTeam.id))
        }
      }).map(group => {
        let totalPoints = 0
        group.teams.forEach((team: any) => {
          totalPoints += team.points
        })
        return {
          ...group,
          totalPoints
        }
      }).sort((a, b) => a.totalPoints < b.totalPoints ? 1 : -1)

    cache.set('points', points)

    return points
  }
}