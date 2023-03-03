import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthBodyType } from "../utils/schemas"
  
export class AuthController{
  static async login(req:Request, res:Response){

    const {email, password} = req.body as AuthBodyType
    const user = await User.showByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '')

    if(!user || !isCorrectPassword){
      return res.status(401).json('E-mail ou Senha inválidos!')
    }

    const accessToken = jwt.sign({
      id: user.id,
      name: user.name,
    },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '12h'
      }
    )
    
    const data = {
      ...user,
      password: undefined,
      accessToken
    }

    return res.json(data)
  }

  static async me(req:Request, res:Response){
    return res.json(req.user)
  }
}