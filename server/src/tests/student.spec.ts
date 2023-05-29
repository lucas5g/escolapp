import { describe, expect, it } from "vitest";
import { StudentService } from "../services/StudentService";

describe('Student', () => {
  it('Student list', async () => {
    const students = await StudentService.findMany({})
    expect(students).toBeTypeOf('object')
    // console.log({students})
  })

})