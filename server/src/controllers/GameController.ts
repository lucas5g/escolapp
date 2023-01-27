import { Request, Response } from "express";
import { z } from "zod";
import { Group } from "../models/Group";

const GameSchemaParams = z.object({
  id: z.number()
})

export class GameController{

  static async index(req:Request, res:Response){

    return res.json(await Group.findMany())
  }

  static async show(req:Request, res:Response){
    const { id } = GameSchemaParams.parse(req.params)

    return res.json(await Group.findUnique(id))
  }

  static async create(req: Request, res:Response){
    
    const data = req.body
  
    return res.json(await Group.create(data))
  }

  static async update(req: Request, res:Response){

    const { id } = GameSchemaParams.parse(req.params)
    const data = req.body
    
    return res.json(await Group.update(id, data))
  }

  static async delete(req:Request, res: Response){

    const { id } = GameSchemaParams.parse(req.params)

    return res.json(await Group.delete(id))
  }
}