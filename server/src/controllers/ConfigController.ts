import { Request, Response } from "express";
import { ConfigService } from "../services/ConfigService";

export class ConfigController{
  static async clearCaches(req:Request, res:Response){
    res.json(await ConfigService.clearCaches())
  }
}