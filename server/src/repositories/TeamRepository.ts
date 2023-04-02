import { teamType } from "../services/TeamService"
import { prisma } from "../utils/prisma"

export class TeamRepository {
  static async findMany(where: any) {
    return await prisma.team.findMany({
      where,
      orderBy: {
        name: 'asc'
      },
      include: {
        genre: true,
        group: true,
        modality: true,
        TeamStudent: {
          select: {
            student: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }

    })
  }

  static async findById(id: number) {
    return await prisma.team.findUnique({
      where: { id },
      include: {
        TeamStudent: {
          include: {
            student: true
          }
        }
      }

    })
  }

  static async findByColumn(column: string, value: any) {
    return await prisma.team.findFirst({
      where: {
        [column]: value
      }
    })
  }
  static async create(data: teamType) {
    const students = data.studentsSelected?.map(id => {
      return { studentId: id }
    })

    return await prisma.team.create({
      data: {
        name: data.name,
        modalityId: data.modalityId,
        groupId: data.groupId,
        genreId: data.genreId,
        TeamStudent: {
          createMany: {
            data: students || []
          }
        }
      },
    })
  }

  static async update(id: number, data: teamType) {
    const students = data.studentsSelected.map(id => {
      return { studentId: id }
    })
    return await prisma.team.update({
      where: { id },
      data: {
        name: data.name,
        modalityId: data.modalityId,
        groupId: data.groupId,
        genreId: data.genreId,
        TeamStudent: {
          deleteMany:{ teamId: id},
          createMany:{
            data: students || []
          }
        },
      },
      include:{
        TeamStudent:true
      }
    })
  }

  static async delete(id: number) {
    return await prisma.team.delete({
      where: { id }
    })
  }
}