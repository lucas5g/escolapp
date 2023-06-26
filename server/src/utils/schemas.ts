import { z } from "zod";

const profiles = [
  'coordinator', 
  'admin',
  'teacher',
  'judge',
  'manager', 
  'representative'
] as const 

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  profile: z.enum(profiles), 
  unityId: z.number()
})  

export const userUpdateSchema = userCreateSchema.extend({
  id: z.number().optional(),
  password: z.string().optional()
})

export const userFilterSchema = z.object({
  profile: z.enum(profiles).optional()
})
export type UserCreateType = z.infer<typeof userCreateSchema>
export type UserUpdateType = z.infer<typeof userUpdateSchema>


export const groupSchema = z.object({
  name: z.string(),
  unityId: z.number()
})

export const groupFilterSchema = z.object({
  unityId: z.coerce.number()
})

export type GroupFilterType = z.infer<typeof groupFilterSchema>

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const authUpdateMeSchema = z.object({
  name: z.string(),
  password: z.string().optional(),
  unityId: z.number()
})

export type authType = z.infer<typeof authSchema>

export const gameSchema = z.object({
  date: z.string().datetime(),
  startHours: z.string(),
  endHours: z.string(),
  placeId: z.number(),
  modalityId: z.number(),
  userId: z.number(),
  comments: z.string().optional().nullable(),
  teams:z.array(
    z.object({
      id: z.number(),
      goals: z.number(),
      fairPlay: z.number(),
      points: z.number()
    })
  )
})

export const gameFilterSchema = z.object({
  userId: z.coerce.number().optional(),
  date: z.string().datetime().optional(),

})

export type GameType = z.infer<typeof gameSchema>
export type GameFilterType = z.infer<typeof gameFilterSchema>




export const studentFilterSchema = z.object({
  group: z.string().optional(),
  unity: z.string()
  // codcur:z.coerce.number().optional(),
  // codper:z.coerce.number().optional()
})

export type StudentFilterType = z.infer<typeof studentFilterSchema>

export const teamSchema = z.object({
  name: z.string(),
  modalityId: z.coerce.number(),
  groupId: z.coerce.number(),
  genreId: z.coerce.number(),
  students:z.string().array()
})

export const teamQuerySchema = z.object({
  modalityId: z.coerce.number().optional(),
})

export type TeamType = z.infer<typeof teamSchema>
export type teamQuerySchema = z.infer<typeof teamQuerySchema>

export const modalitySchema = z.object({
  name: z.string(),
  membersQuantity: z.coerce.number(),
  teamsQuantity: z.coerce.number(),
  type: z.enum(['collective', 'individual', 'participative', 'ranking']),
  unityId: z.number()
})

export type ModalityInterface = z.infer<typeof modalitySchema >

/**
 * Places 
 */

export const placeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  unityId: z.number()
})

export const placeFilterSchema = z.object({
  unityId: z.coerce.number()
}).optional()


export type PlaceType = z.infer<typeof placeSchema>
export type PlaceFilterType = z.infer<typeof placeFilterSchema>


export const unitySchema = z.object({
  name: z.string()
})

export const setupSchema = z.object({
  documentLink: z.string().url(),
  unityId: z.number()
})