import { describe, expect, it } from "vitest";
import { PlaceService } from "../services/PlaceService";

describe('Place', () => {
  it('Place list', async () => {
    const places = await PlaceService.findMany()
    expect(places.length).toBeGreaterThan(0)
  })

  it('Place show', async() => {
    const place = await PlaceService.findById(1)
    expect(place).toHaveProperty('name')
  })

  it('Place crud', async() => {

    const data = {
     name: 'name',
    }
    /**
     * Create
     */
    const place = await PlaceService.create(data)
    expect(place).toHaveProperty('name', data.name)

    /**
     * Update
     */
    const placeUpdate = await PlaceService.update(place.id, {name:'test-update' })
    expect(placeUpdate).toHaveProperty('name', 'test-update')
    /**
     * Delete
     */
    await PlaceService.delete(place.id)
  })

})