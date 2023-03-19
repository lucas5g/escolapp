import { Request, Response } from "express";

export class ProjectController{

  static async index(req:Request, res:Response){
    res.json('list projects')
  }
}