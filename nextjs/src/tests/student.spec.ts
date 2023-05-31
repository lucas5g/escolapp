import { describe, expect, it } from "vitest";
import { StudentService } from "@/services/StudentService";
import { StudentType } from "@/utils/schemas";

describe('Student', () => {
  it('Student list', async () => {
    const students = await StudentService.findMany() as StudentType[]
    students.forEach(student => {
      expect(student).toHaveProperty('name')
      expect(student).toHaveProperty('ra')
      
    })
  })

})