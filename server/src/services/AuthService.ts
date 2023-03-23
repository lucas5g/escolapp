import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserRepository } from "../repositories/UserRepository";
// import { authType } from "../utils/schemas";

export class AuthService{

  static async login(data:authType){
    const {email, password } = data

    const user = await UserRepository.findByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '')

    if(!user || !isCorrectPassword){
      throw new Error('E-mail ou Senha inválidos!')
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
}