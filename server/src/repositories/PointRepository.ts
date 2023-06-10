import { prisma } from "../utils/prisma";

export class PointRepository {
  static async findMany() {
    const groups = await prisma.group.findMany({
      include: {
        teams: {
          select:{
            id: true 
          }
        }
      }
    })

    const groupsWithTeams = groups.filter(group => group.teams.length > 0)

    const games = await prisma.game.findMany()
      
    const gamesTeams = games.map(game => game.teams).flat()

    console.log(groupsWithTeams[0])

    return gamesTeams
    // console.log(games[0].teams)
  }
}