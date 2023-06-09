import { cache } from "../utils/cache";
import { googleSheets } from "../utils/google-sheets";

interface StudentInterface{
  ra:string 
  name:string 
  group:string 
  groupOld:string
}

export class StudentRepository {

  static async findMany(){

    if(cache.has('students')){
      return cache.get('students') as StudentInterface[]
    }

    const studentsAllFields = await googleSheets({range:'all!a:g'}) as StudentInterface[]
    const students= studentsAllFields.map(student => {
      return {
        ra: student.ra,
        name: student.name,
        group: student.group
      }
    })

    cache.set('students', students)
    return students

  }

  // static async findById(id:string) {
  //   return await prisma.student.findUnique({
  //     where: {id}
  //   })
  // }

  // static async create(data:any) {
  //   return await prisma.student.create({ data })
  // }

  // static async update(id:string, data:any){
  //   return await prisma.student.update({
  //     where: {id},
  //     data,
  //   })
  // }

  // static async delete(id:string){
  //   return await prisma.student.delete({
  //     where: {id}
  //   })
  // }
}