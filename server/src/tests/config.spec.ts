import { describe, expect, it } from "vitest";
import { ConfigService } from "../services/ConfigService";


describe('Cache', () => {
  it('List and clear caches', async() => {
    const data = await ConfigService.clearCaches()
    expect(data).toBe

  })
})