import { NextFunction, Request, Response } from "express";
import { TeamRepository } from "../repositories/TeamRepository";
import { TeamService } from "../services/TeamService";

export class TeamController{

  static async index(req:Request, res:Response){
    res.json(await TeamService.findMany(req.query))
  }

  static async show(req:Request, res:Response){
    res.json(await TeamService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      return res.json(await TeamRepository.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    res.json(await TeamService.update(Number(req.body.id), req.body))
  }

  static async delete(req:Request, res: Response){
    res.json(await TeamService.delete(Number(req.params.id)))
  }
}