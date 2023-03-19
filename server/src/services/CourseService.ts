import { CourseRepository } from "../repositories/CourseRepository";

export class CourseService{
  static async findMany(){
    return await CourseRepository.findMany()
  }
}