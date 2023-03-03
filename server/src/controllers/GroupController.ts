import { Request, Response } from "express";
import { Group } from "../models/Group";
import { GroupBodyType } from "../utils/schemas";

export class GroupController{

  static async index(req:Request, res:Response){

    return res.json(await Group.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await Group.findUnique(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    
    const data = req.body as GroupBodyType
  
    return res.json(await Group.create(data))
  }

  static async update(req: Request, res:Response){

    const { id } = req.params 
    const data = req.body as GroupBodyType
    
    return res.json(await Group.update(Number(id), data))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Group.delete(Number(req.params.id)))
  }
}