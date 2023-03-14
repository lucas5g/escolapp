import { describe, expect, it } from "vitest";
import { GameService } from "../services/GameService";

describe('Game', () => {
  it('Game list', async () => {
    const games = await GameService.findMany()
    expect(games.length).toBeGreaterThan(0)
  })

  it('Game show', async() => {
    const game = await GameService.findById(1)
    expect(game).toHaveProperty('startHours')
  })

  it('Game crud', async() => {

    const data = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: 1,
      modalityId: 1,
      userId: 1
    }
    /**
     * Create
     */
    const game = await GameService.create(data)
    expect(game).toHaveProperty('startHours', data.startHours)

    /**
     * Update
     */
    const gameUpdate = await GameService.update(game.id, {...data, placeId:2 })
    expect(gameUpdate).toHaveProperty('placeId', 2)

    /**
     * Delete
     */
    await GameService.delete(game.id)
  })

})