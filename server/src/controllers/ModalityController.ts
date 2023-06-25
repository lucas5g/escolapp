import { NextFunction, Request, Response } from "express";
import { ModalityService } from "../services/ModalityService";
export class ModalityController{

  static async index(req:Request, res:Response){
    res.json(await ModalityService.findMany(req.user))
  }

  static async show(req:Request, res:Response){
    res.json(await ModalityService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      res.json(await ModalityService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    res.json(await ModalityService.update(Number(req.params.id), req.body))
  }

  static async delete(req:Request, res: Response, next:NextFunction){
    try{
      res.json(await ModalityService.delete(Number(req.params.id)))
    }catch(error){
      next(error)
    }
  }
}