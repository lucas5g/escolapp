import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { env } from "./env";
export  function auth(req:Request, res:Response, next: NextFunction){
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if(!token) return res.status(401).json({message:'Nenhum token fornecido!'})

  try{
    const decoded = jwt.verify(token, env.jwtSecret) as any
    req.user = decoded
    return next()
        
  }catch(error){
    res.status(401).json({message:'Token inválido!'})
  }

}
