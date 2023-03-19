import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

  static async index(req: Request, res: Response) {
    res.json(await UserService.findMany())
  }

  static async show(req: Request, res: Response) {
    res.json(await UserService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await UserService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response) {
    res.json(await UserService.update(Number(req.params.id), req.body))
  }

  static async delete(req: Request, res: Response) {
    return res.json(await UserService.delete(Number(req.params.id)))
  }
}