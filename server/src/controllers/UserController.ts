import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../models/User";
import { UserService } from "../services/UserService";


export class UserController {

  static async index(req: Request, res: Response) {
    return res.json(await User.findMany())
  }

  static async show(req: Request, res: Response) {
    return res.json(await User.show(Number(req.params.id)))
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(201).json(await UserService.create(req.body))
    } catch (error) {
      next(error)
    }


    // }catch(error){
    //   console.log('error', error)
    //   return res.status(400).json(error)   
    // }
  }

  static async update(req: Request, res: Response) {

    const { id } = req.params
    const { body } = req

    return res.json(await User.update(Number(id), body))
  }

  static async delete(req: Request, res: Response) {

    return res.json(await User.delete(Number(req.params.id)))
  }
}