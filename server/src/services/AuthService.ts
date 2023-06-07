import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserRepository } from "../repositories/UserRepository";
import { authSchema, authType, authUpdateMeSchema } from "../utils/schemas";

export class AuthService{

  static async login(data:any){
    const {email, password } = authSchema.parse(data)

    const user = await UserRepository.findByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '')

    if(!user || !isCorrectPassword){
      throw new Error('E-mail ou Senha inválidos!')
    }


    const accessToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email
    },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '12h'
      }
    )

    const login = {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken
    }

    return login
    
  }

  static async me(userId:number){
    return await UserRepository.findById(userId)
  }

  static async updateMe(userId:number,  data:any){
    const user = authUpdateMeSchema.parse(data)
    return await UserRepository.update(userId, user)
  }
  
}