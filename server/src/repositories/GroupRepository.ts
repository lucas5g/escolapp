import { prisma } from "../utils/prisma";

export class GroupRepository {

  static async findMany(){
    return await prisma.group.findMany({})
  

  //   if(cache.has('groups')){
  //     return cache.get('groups')
  //   }

  //   const groupsSheet = await googleSheets({range:'groups!a:d'})
  //   const groups = groupsSheet?.map( group => {
  //     return {
  //       id: group.id,
  //       name:group.group,
  //       quantity: group.quantity,
  //       unity: group.unity,
  //     }
  //   })

  //   cache.set('groups', groups)
  //   return groups
  }

  static async findById(id:number) {
    return await prisma.group.findUnique({
      where: { id }
    })
  }

  static async create(data:any) {
    return await prisma.group.create({ data })
  }

  static async update(id:number, data:any){
    return await prisma.group.update({
      where: {id},
      data,
    })
  }

  static async delete(id:number){
    return await prisma.group.delete({
      where: {id}
    })
  }
}