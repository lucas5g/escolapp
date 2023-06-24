import { cache } from "../utils/cache";
import { googleSheets } from "../utils/google-sheets";
import { StudentFilterType } from "../utils/schemas";

interface StudentInterface{
  ra:string 
  name:string 
  group:string 
  groupOld:string
  unity:string
}

export class StudentRepository {

  static async findMany(filter:StudentFilterType){

    const studentsCache = `students_${filter.unity}`
    if(cache.has(studentsCache)){
      return cache.get(studentsCache) as StudentInterface[]
    }
    
    const studentsAllFields = await googleSheets({range:`${filter.unity}!a:g`}) as StudentInterface[]
    const students= studentsAllFields.map(student => {
      return {
        ra: student.ra,
        name: student.name,
        group: student.group,
        unity: student.unity
      }
    })

    cache.set(studentsCache, students)
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