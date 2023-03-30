import { NextFunction, Request, Response } from 'express'
export function errors(error:any, req:Request, res:Response, next:NextFunction){
  // console.log(error.issues)
  const validations = error?.issues?.reduce((acc:string, error:any) => {
    return acc += `${error.path} ${error.message}\n`
  }, '')


  if(error.message){
    return res.status(400).json({message: validations ?? error.message})
  }

  return next()
}