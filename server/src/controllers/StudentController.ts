import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController {

  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await StudentService.findMany(req.query as any))
    } catch (error) {
      next(error)
    }
  }

  static async show(req: Request, res: Response) {
    res.json(await StudentService.findById(req.params.id))
  }

  static async create(req: Request, res: Response) {
    return res.json(await StudentService.create(req.body))
  }

  static async update(req: Request, res: Response) {
    return res.json(await StudentService.update(req.params.ra, req.body))
  }

  static async delete(req: Request, res: Response) {
    return res.json(await StudentService.delete(req.params.ra))
  }
}