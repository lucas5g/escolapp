import { Request, Response } from "express";
import { Student } from "../models/Student";

export class StudentController{

  static async index(req:Request, res:Response){
    return res.json(await Student.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await Student.findUniqueByRa(req.params.ra))
  }

  static async create(req: Request, res:Response){
    const { body } = req
    return res.json(await Student.create(body))
  }

  static async update(req: Request, res:Response){

    const { ra } = req.params 
    const { body } = req 
    return res.json(await Student.update(ra, body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Student.delete(req.params.ra))
  }
}