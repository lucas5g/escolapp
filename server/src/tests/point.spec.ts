import { describe, it } from "vitest";
import { PointService } from "../services/PointService";

describe('Point', () => {
  it('Report points', async() => {
    const points = await PointService.findMany()
    return console.log(points)
    points.forEach(point => {
      console.log(point)
    })
  })
})