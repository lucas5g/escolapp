import { Request, Response } from "express";
import { Place } from "../models/Place";

export class PlaceController{

  static async index(req:Request, res:Response){
    return res.json(await Place.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await Place.findUnique(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    const { body } = req

    return res.json(await Place.create(body))
  }

  static async update(req: Request, res:Response){

    const { id } = req.params 
    const { body } = req 

    return res.json(await Place.update(Number(id), body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Place.delete(Number(req.params.id)))
  }
}