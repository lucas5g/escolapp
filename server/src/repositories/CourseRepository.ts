import { prisma } from "../utils/prisma";

export class CourseRepository {
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
        group: course.group,
        codcur: course.codcur,
        codper: course.codper
      }
    })

    return courses
  }
}