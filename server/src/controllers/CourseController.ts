import { Request, Response } from "express";
import { Course } from "../models/Course";

export class CourseController{
  static async index(req:Request, res:Response){
    return res.json(await Course.findMany())
  }
}