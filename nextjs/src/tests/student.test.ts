import { StudentService } from "../services/StudentService";
import { describe, it } from "vitest";

describe('Student', () => {
  it('Student list', async () => {

    const students = await StudentService.findMany()
    console.log(students)
  })
})