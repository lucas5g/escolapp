import { describe, expect, it } from "vitest";
import { StudentService } from "../services/StudentService";

describe('Student', () => {
  it('Student list', async () => {
    const students = await StudentService.findMany()
    expect(students.length).toBeGreaterThanOrEqual(0)

  })



  it('Student crud', async () => {
    const data = {
      ra:'c123124',
      name: 'Teat name Student',
      course: 'EM - 1ª SÉRIE',
      group: 'M1CCM',
      codcur: 23,
      codper: 1
    }

    /**
     * Create
     */
    const student = await StudentService.create(data)
    expect(student).toHaveProperty('ra', data.ra)

    /**
     * Show
     */
    const studentShow = await StudentService.findByRa(student.ra)
    expect(studentShow).toHaveProperty('ra')

    /**
     * Update
     */
    const studentUpdate = await StudentService.update(student.ra, {...data, codper:5})
    expect(studentUpdate).toHaveProperty('codcur', studentUpdate.codcur)
  
    /**
     * Delete
     */
    await StudentService.delete(student.ra)
  })
})