import { Request, Response } from "express";
import { Project } from "../models/Project";

export class ProjectController{

  static async index(req:Request, res:Response){
    return res.json(await Project.findMany())
  }
}