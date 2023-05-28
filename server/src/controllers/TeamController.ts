import { NextFunction, Request, Response } from "express";
import { TeamService } from "../services/TeamService";

export class TeamController{

  static async index(req:Request, res:Response, next:NextFunction){
    try{
      res.json(await TeamService.findMany(req.query))
    }catch(error){
      next(error)
    }
  }

  static async show(req:Request, res:Response){
    res.json(await TeamService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      res.json(await TeamService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response, next:NextFunction){
    try{
      res.json(await TeamService.update(Number(req.params.id), req.body))
    }catch(error){
      next(error)
    }
  }

  static async delete(req:Request, res: Response){
    res.json(await TeamService.delete(Number(req.params.id)))
  }
}