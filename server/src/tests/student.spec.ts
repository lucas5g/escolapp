import { describe, expect, it } from "vitest";
import { StudentService } from "../services/StudentService";

// describe.skip('Student', () => {
//   it('Student list', async () => {
//     const students = await StudentService.findMany({})
//     expect(students).toBeTypeOf('object')
//     // console.log({students})
//   })

//   it('Student filter by codcur and codper', async() => {
//     const students = await StudentService.findMany({codcur:23, codper:1})
//     students.forEach(student => {
//       expect(student.codcur).toBe(23)
//       expect(student.codper).toBe(1)
//       expect(student).toHaveProperty('ra')
//       expect(student).toHaveProperty('name')
//       expect(student).toHaveProperty('course')
//       expect(student).toHaveProperty('groupJisa')      
//     })
//   })

// })