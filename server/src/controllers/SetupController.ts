import { Request, Response } from "express";
import { SetupServive } from "../services/SetupService";

export class SetupController{

  static async index(req:Request, res:Response){
    return res.json(await SetupServive.findMany(req.user))
  }

  static async update(req:Request, res:Response){
    res.json(await SetupServive.update(Number(req.params.id), req.body))
  }
}