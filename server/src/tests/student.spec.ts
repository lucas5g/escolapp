import { describe, expect, it } from "vitest";
import { StudentService } from "../services/StudentService";

describe('Student', () => {
  it('Student list', async () => {
    const students = await StudentService.findMany()
    expect(students).toBeTypeOf('object')
  })

  it('Student filter by codcur and codper', async() => {
    const students = await StudentService.findMany({codcur:23, codper:1})
    students.forEach(student => {
      expect(student.codcur).toBe(23)
      expect(student.codper).toBe(1)
    })
  })

  it('Student crud', async () => {
    const data = {
      id:'c123124',
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
    expect(student).toContain({id: student.id})

    /**
     * Show
     */
    const studentShow = await StudentService.findById(student.id)
    expect(studentShow).toHaveProperty('id')

    /**
     * Update
     */
    const studentUpdate = await StudentService.update(student.id, {...data, codper:5})
    expect(studentUpdate).toHaveProperty('codcur', studentUpdate.codcur)
  
    /**
     * Delete
     */
    await StudentService.delete(student.id)
  })
})