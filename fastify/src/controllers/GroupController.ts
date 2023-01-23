import { FastifyRequest } from "fastify";
import { z } from 'zod'
import { Group } from "../models/Group";

const SchemaParams = z.object({
  id: z.coerce.number()
})

const SchemaBody = z.object({
  name: z.string(),
  codcur: z.number(),
  codper: z.number()
})
export class GroupController{

  static async index(){
    return await Group.findMany()
  }

  static async show(req:FastifyRequest){
    const {id} = SchemaParams.parse(req.params)
    return await Group.findUnique(id)
  }

  static async create(req: FastifyRequest){
    const data = SchemaBody.parse(req.body)

    return await Group.create(data)
  }

  static async update(req:FastifyRequest){

    const { id } = SchemaParams.parse(req.params)
    const data = SchemaBody.parse(req.body) 
    
    return await Group.update(id, data)
  }

  static async delete(req:FastifyRequest){
    const {id} = SchemaParams.parse(req.params)

    return await Group.delete(id)
  }
}