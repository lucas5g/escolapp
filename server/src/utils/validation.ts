import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

const messagesTranslate = (message:string)=> {
  const messageObject:any = {
    'Expected date, received string':'Data esperada, texto recebido.',
    'Required':'é obrigatório.',
    'Invalid datetime':'deve ser data horas.',
    'Invalid date':'deve ser data.'
  }
  return messageObject[message]
}

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

    let message = ``    
    const errors = error.errors.map((error:any) => {
      message += `${error.path} ${messagesTranslate(error.message)}\n`
      return {
        path: error.path[0],
        message: error.message
      }
    })

    // console.log({
    //   message,
    //   errors
    // })

    return res.status(400).send({
      message,
      errors
    })
  }

}