import { cache } from "../utils/cache";
import { prisma } from "../utils/prisma";

export class PointRepository {
  static async findMany() {

    if(cache.has('points')){
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

    const points = groups.map(group => {
      return {
        ...group,
        teams: group.teams.map(team => {
          const gamesTeamsFilter = gamesTeams.find((gameTeam: any) => gameTeam.id === team.id)
          return gamesTeamsFilter
        }),
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
    }).filter(group => group.teams.length > 0)
    .sort((a, b) => a.totalPoints < b.totalPoints ? 1 : -1)

    cache.set('points', points)

    return points
  }
}