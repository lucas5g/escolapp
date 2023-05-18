import { z } from "zod";

const profiles = [
  'coordinator', 
  'judge',
  'manager', 
  'representative'
] as const 

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  profile: z.enum(profiles).optional()
})  



export const userUpdateSchema = userCreateSchema.extend({
  password: z.string().optional()
})

export type UserCreateType = z.infer<typeof userCreateSchema>
export type UserUpdateType = z.infer<typeof userUpdateSchema>


export const groupSchema = z.object({
  name: z.string(),
  codcur: z.number(),
  codper: z.number()
})

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type authType = z.infer<typeof authSchema>

export const gameSchema = z.object({
  date: z.string().datetime(),
  startHours: z.string(),
  endHours: z.string(),
  placeId: z.number(),
  modalityId: z.number(),
  userId: z.number(),
  teams: z.number().array()
})

export type GameType = z.infer<typeof gameSchema>

export const teamQuerySchema = z.object({
  modalityId:z.coerce.number().optional()
})

