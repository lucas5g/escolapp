import { z } from "zod";

export const GroupBodySchema = z.object({
  name: z.string(),
  codcur: z.number(),
  codper: z.number()
})

export type GroupBodyType = z.infer<typeof GroupBodySchema>


export const AuthBodySchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido!'
  }),
  password: z.string().min(3)
})

export type AuthBodyType = z.infer<typeof AuthBodySchema>

export const GameBodySchema = z.object({
  date: z.coerce.date(),
  startHours: z.string(),
  endHours: z.string(),
  placeId: z.number(),
  modalityId: z.number(),
  userId: z.number()
})

export type GameBodyType = z.infer<typeof GameBodySchema>