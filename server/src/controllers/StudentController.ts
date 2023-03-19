import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController{

  static async index(req:Request, res:Response){
    res.json(await StudentService.findMany())
  }

  static async show(req:Request, res:Response){
    res.json(await StudentService.findByRa(req.params.ra))
  }

  static async create(req: Request, res:Response){
    return res.json(await StudentService.create(req.body))
  }

  static async update(req: Request, res:Response){
    return res.json(await StudentService.update(req.params.ra, req.body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await StudentService.delete(req.params.ra))
  }
}