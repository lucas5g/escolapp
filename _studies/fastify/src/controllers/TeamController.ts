import { Request, Response } from "express";
import { Team } from "../models/Team";

export class TeamController{

  static async index(req:Request, res:Response){
    return res.json(await Team.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await Team.findUnique(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    const { body } = req

    return res.json(await Team.create(body))
  }

  static async update(req: Request, res:Response){

    const { id } = req.params 
    const { body } = req 

    return res.json(await Team.update(Number(id), body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Team.delete(Number(req.params.id)))
  }
}