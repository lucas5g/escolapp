import { prisma } from "../utils/prisma";

export class User {

  static async findMany(){
    return await prisma.user.findMany({
      select:{
        id: true,
        email: true,
        name: true
      }
    })
  }

  static async show(id:number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true
      }
    })
  }

  static async showByEmail(email:string) {
    return await prisma.user.findUnique({
      where: { email }      
    })
  }

  static async create(data:any) {
    return await prisma.user.create({ 
      data,
      select:{
        id: true,
        email: true,
        name: true
      }
    })
  }

  static async update(id:number, data:any){
    return await prisma.user.update({
      where: {id},
      data,
      select: {
        id: true,
        email: true,
        name: true
      }
    })
  }

  static async delete(id:number){
    return await prisma.user.delete({
      where: {id}
    })
  }
}