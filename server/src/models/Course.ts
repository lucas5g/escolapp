import { prisma } from "../utils/prisma";

export class Course {
  static async findMany(){
    const data =  await prisma.student.findMany({
      distinct:['course'],
      select:{
        course: true,
        group: true,
        codcur: true,
        codper:true                 
      }
    })

    const courses = data.map(course => {
      return {
        name: course.course,
        ...course,
        course: undefined
      }
    })

    return courses
  }
}