import { NextFunction, Request, Response } from "express";
import { PlaceService } from "../services/PlaceService";
export class PlaceController{

  static async index(req:Request, res:Response){
    res.json(await PlaceService.findMany(req.query as any))
  }

  static async show(req:Request, res:Response){
    res.json(await PlaceService.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response, next:NextFunction){
    try{
      return res.json(await PlaceService.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req: Request, res:Response){
    res.json(await PlaceService.update(Number(req.params.id), req.body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await PlaceService.delete(Number(req.params.id)))
  }
}