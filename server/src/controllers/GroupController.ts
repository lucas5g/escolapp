import { NextFunction, Request, Response } from "express";
import { GroupService } from "../services/GroupService";

export class GroupController{

  static async index(req:Request, res:Response, next:NextFunction){
    try{
      return res.json(await GroupService.findMany(req.query))
    }catch(error){
      next(error)
    }
  }

  static async show(req:Request, res:Response){
    res.json(await GroupService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      res.json(await GroupService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    res.json(await GroupService.update(Number(req.params.id), req.body))
  }

  static async delete(req:Request, res: Response, next:NextFunction){
    try{
      res.json(await GroupService.delete(Number(req.params.id)))
    }catch(error){
      next(error)
    }
  }
}