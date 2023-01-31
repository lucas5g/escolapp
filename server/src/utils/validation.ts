import { Schema } from "zod";

export function validation(schema: Schema, req: any){

  return schema.parse(req)
  
}