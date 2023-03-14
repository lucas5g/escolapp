import { NextFunction, Request, Response } from "express";
import { GameService } from "../services/GameService";

export class GameController{

  static async index(req:Request, res:Response){
    return res.json(await GameService.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await GameService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){  
    try{
      return res.status(201).json(await GameService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    return res.json(await GameService.update(Number(req.params.id), req.body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await GameService.delete(Number(req.params.id)))
  }
}