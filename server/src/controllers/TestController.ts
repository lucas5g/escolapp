import { Request, Response } from "express";
import { SheetService } from "../services/SheetService";

export class TestController {
  static async index(req:Request, res: Response){
    res.json(await SheetService.findMany())
  }
}