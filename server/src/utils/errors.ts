import { NextFunction, Request, Response } from 'express'
export function errors(error:any, req:Request, res:Response, next:NextFunction){

  const validations = error?.issues?.reduce((acc:any, error:any) => {
    return {...acc, [error.path[0]]: error.message}
  }, {})

  if(validations){
    return res.status(400).json({message:'Validation Errors', errors: validations })
  }

  if(error.message){
    return res.status(400).json({message: error.message})
  }

  return next()
}