import { Request, Response } from "express";
import { PointService } from "../services/PointService";

export class PointController{
  static async index(req:Request, res:Response ){
    res.json(await PointService.findMany())
  }
}