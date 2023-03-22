import { describe, expect, it } from "vitest";
import { CourseService } from "../services/CourseService";

describe('Course', () => {
  it.only('list courses', async() => {
    const courses = await CourseService.findMany()
    expect(courses.length).toBeGreaterThanOrEqual(0)
    expect(courses[0]).toHaveProperty('name')
  })
})