import bcrypt from 'bcrypt'
import { User } from "../models/User"
import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { app } from '../server'

const SchemaBody = z.object({
  email: z.string().email(),
  password: z.string()
})
export class AuthController{
  static async login(req:FastifyRequest, replay:FastifyReply){

    const { email, password } = SchemaBody.parse(req.body)
    
    const user = await User.showByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '')

    if(!user || !isCorrectPassword){
      return replay.status(401).send('E-mail ou Senha incorreto!')
    }

  
    const accessToken = await replay.jwtSign({
      id: user.id,
      name: user.name,
      email: user.email
    },
    {
      expiresIn: '1d',

    })


    return { accessToken}

  }

  static async me(req:FastifyRequest, replay:FastifyReply){
    return req.user
  }
}