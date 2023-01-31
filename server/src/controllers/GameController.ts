import { Request, Response } from "express";
import { z } from "zod";
import { Game } from "../models/Game";

const GameSchemaParams = z.object({
  id: z.number()
})

export class GameController{

  static async index(req:Request, res:Response){

    return res.json(await Game.findMany())
  }

  static async show(req:Request, res:Response){
    const { id } = GameSchemaParams.parse(req.params)

    return res.json(await Game.findUnique(id))
  }

  static async create(req: Request, res:Response){
    
    const data = req.body
  
    return res.json(await Game.create(data))
  }

  static async update(req: Request, res:Response){

    const { id } = GameSchemaParams.parse(req.params)
    const data = req.body
    
    return res.json(await Game.update(id, data))
  }

  static async delete(req:Request, res: Response){

    const { id } = GameSchemaParams.parse(req.params)

    return res.json(await Game.delete(id))
  }
}