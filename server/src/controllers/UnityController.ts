import { NextFunction, Request, Response } from "express";
import { UnityService } from "../services/UnityService";

export class UnityController{

  static async index(req:Request, res:Response){
    return res.json(await UnityService.findMany())
  }

  static async show(req:Request, res:Response){
    res.json(await UnityService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      res.json(await UnityService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    res.json(await UnityService.update(Number(req.params.id), req.body))
  }

  static async delete(req:Request, res: Response, next:NextFunction){
    try{
      res.json(await UnityService.delete(Number(req.params.id)))
    }catch(error){
      next(error)
    }
  }
}