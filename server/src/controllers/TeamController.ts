import { Request, Response } from "express";
import { z } from "zod";
import { Team } from "../models/Team";
import { validation } from "../utils/validation";

const TeamSchemaBody = z.object({
  // id: z.number(),
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number()
})

const TeamSchemaParams = z.object({
  id: z.coerce.number()
})
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

    const { id } = TeamSchemaParams.parse(req.params)
    const data = TeamSchemaBody.parse(req.body)

    return res.json(await Team.update(id, data))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Team.delete(Number(req.params.id)))
  }
}