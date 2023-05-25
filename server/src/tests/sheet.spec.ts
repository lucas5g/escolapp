import { describe, it } from "vitest";
import { SheetService } from "../services/SheetService";

describe('Sheet', () => {
  it.only('List', async () => {
    const students = await SheetService.findMany()

    console.log(students)
  })
})