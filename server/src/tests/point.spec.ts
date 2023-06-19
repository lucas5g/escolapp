import { describe, expect, it } from "vitest";
import { PointService } from "../services/PointService";

describe('Point', () => {
  it('Report points', async() => {
    const points = await PointService.findMany()
    points.forEach(point => {
      expect(point).toHaveProperty('totalPoints')
      expect(point).toHaveProperty('teams')
    })
  })
})