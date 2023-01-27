import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../models/User";

export class UserController{

  static async index(req:Request, res:Response){
    return res.json(await User.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await User.show(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    const { body } = req

    if(await User.showByEmail(body.email)){
      return res.json(`Ja foi cadastrado o usuário com e-mail ${body.email}!`)
    }

    const data = {
      ...body,
      password: await bcrypt.hash(body.password, 12)
    }
    return res.json(await User.create(data))
  }

  static async update(req: Request, res:Response){

    const { id } = req.params 
    const { body } = req 

    return res.json(await User.update(Number(id), body))
  }

  static async delete(req:Request, res: Response){

    return res.json(await User.delete(Number(req.params.id)))
  }
}