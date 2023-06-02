import { NextFunction, Request, Response } from "express"
import { AuthService } from "../services/AuthService"
import { UserService } from "../services/UserService"
  
export class AuthController{
  static async login(req:Request, res:Response, next:NextFunction){
    try{
      res.json(await AuthService.login(req.body))   
    }catch(error){
      // console.log(error)
      next(error)
    }

  }

  static async me(req:Request, res:Response){
    res.json(await AuthService.me(req.user.id))
  }

  static async update(req:Request, res:Response){
    res.json(await UserService.update(req.user.id, {...req.user, password: req.body.password }))
  }


}