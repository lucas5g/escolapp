import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
export class CourseController{
  static async index(req:Request, res:Response){
    return res.json(await CourseService.findMany())
  }
}