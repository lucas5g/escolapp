import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

export const validation = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  
  try {
    if(Object.keys(req.body).length !== 0){
      schema.parse(req.body)
    }else if(Object.keys(req.query).length !== 0){
      schema.parse(req.query)
    }else{
      schema.parse(req.params)
    }

    next()
  } catch (error: any) {

    console.log(error.errors)
    const fields = error.errors.map((error: {message:string}) => {
      return {
        message: error.message
      }
    })

    console.log(error.errors)

    return res.status(400).send(fields)
  }

}