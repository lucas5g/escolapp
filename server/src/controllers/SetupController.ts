import { NextFunction, Request, Response } from "express";
import { SetupServive } from "../services/SetupService";

export class SetupController{

  static async index(req:Request, res:Response){
    return res.json(await SetupServive.findMany(req.user))
  }

  static async create(req:Request, res:Response, next:NextFunction){
    try{
      return res.status(201).json(await SetupServive.create(req.body))
    }catch(error){
      next(error)
    }
  }

  static async update(req:Request, res:Response){
    res.json(await SetupServive.update(Number(req.params.id), req.body))
  }
}