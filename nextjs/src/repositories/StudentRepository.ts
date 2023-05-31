import { googleSheets } from "@/libs/google-sheets";
import { cache } from "@/libs/node-cache";

export class StudentRepository{
  static async findMany(){
    if(cache.has('students')){
      return cache.get('students')
    }
    const students = await googleSheets({range:'all!a:e'})
    cache.set('students', students)

    return students

  }
}