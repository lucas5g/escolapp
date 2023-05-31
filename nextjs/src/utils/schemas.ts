import { z } from "zod";

const studentSchema = z.object({
  name:z.string(),
  ra: z.string()
})

export type StudentType = z.infer<typeof studentSchema>
