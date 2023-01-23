import { prisma } from "../utils/prisma";

export class Project{

  static async findMany(){
    return await prisma.project.findMany()
  }

}