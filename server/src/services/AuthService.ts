import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserRepository } from "../repositories/UserRepository";
import { authSchema, authType, authUpdateMeSchema } from "../utils/schemas";
import { env } from '../utils/env';

export class AuthService {

  static async login(data: any) {
    const { email, password } = authSchema.parse(data)

    const user = await UserRepository.findByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '')

    if (!user || !isCorrectPassword) {
      throw new Error('E-mail ou Senha inválidos!')
    }

    const userAuth = {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      unityId: user.unityId
    }

    const accessToken = jwt.sign(
      userAuth,
      env.jwtSecret,
      {
        expiresIn: '5d'
      }
    )

    return {
      ...userAuth,
      accessToken
    }

  }

  static async me(userId: number) {
    return await UserRepository.findById(userId)
  }

  static async updateMe(userId: number, data: any) {
    
    
    const user = authUpdateMeSchema.parse(data)

    const auth =  await UserRepository.update(userId, user)

    const accessToken = jwt.sign(
      auth,
      env.jwtSecret,
      {
        expiresIn: '5d'
      }
    )

    return {
      ...auth,
      accessToken
    }
  }

}