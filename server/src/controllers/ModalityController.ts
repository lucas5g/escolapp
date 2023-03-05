import { Request, Response } from "express";
import { Modality } from "../models/Modality";

export class ModalityController{

  static async index(req:Request, res:Response){
    return res.json(await Modality.findMany())
  }

  static async show(req:Request, res:Response){
    return res.json(await Modality.findById(Number(req.params.id)))
  }

  static async create(req: Request, res:Response){
    const data = req.body

    if(await Modality.findByKey('name', data.name)){
      return res.status(401).json({message: `Modalidade ${data.name} já foi cadastrada!`})
    }

    return res.json(await Modality.create(data))
  }

  static async update(req: Request, res:Response){

    const { id } = req.params 
    const { body } = req 

    return res.json(await Modality.update(Number(id), body))
  }

  static async delete(req:Request, res: Response){
    return res.json(await Modality.delete(Number(req.params.id)))
  }
}