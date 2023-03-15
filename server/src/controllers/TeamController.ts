import { Request, Response } from "express";
import { z } from "zod";
import { Team } from "../models/Team";
import { teamQuerySchema } from "../utils/schemas";


export class TeamController{

  static async index(req:Request, res:Response){

    const query = teamQuerySchema.parse(req.query)
    return res.json(await Team.findMany(query))
  }

  static async show(req:Request, res:Response){
    return res.json(await Team.findUnique(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    const { body } = req
    return res.json(await Team.create(body))
  }

  static async update(req: Request, res:Response){

    const data = req.body

    return res.json(await Team.update(Number(req.body.id), data))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Team.delete(Number(req.params.id)))
  }
}