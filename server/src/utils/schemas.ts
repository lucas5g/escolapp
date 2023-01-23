import { z } from "zod";

export const GroupSchema = z.object({
  name: z.string({
    // required_error:'Nome da Turma é obrigatório'
  }),
  codcur: z.coerce.number(),
  // ({
    // required_error: 'Código do Curso é obrigatório'
  // }),
  codper: z.coerce.number()
})

export type GroupType = z.infer<typeof GroupSchema>


export const AuthSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido!'
  }),
  password: z.string().min(3)
})


export type AuthType = z.infer<typeof AuthSchema>