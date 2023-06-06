import moment from "moment";
import { describe, expect, it } from "vitest";
import { GameService } from "../services/GameService";
import { PlaceService } from "../services/PlaceService";
import { UserService } from "../services/UserService";

describe('Game', () => {
  it('Game list', async () => {
    const games = await GameService.findMany()
    expect(games.length).toBeGreaterThanOrEqual(0)

    games.forEach(game => {

      expect(game).toHaveProperty('modality')
      expect(game).toHaveProperty('user')
      expect(game).toHaveProperty('place')
      // expect(game).toHaveProperty('teams')
      expect(game).toHaveProperty('hours')
      // expect(game.teams[0]).toHaveProperty('name')
    })
  })


  it('Game create', async () => {
    const data = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: 1,
      modalityId: 1,
      userId: 1,
      teams: [53, 40]
    }

    const game = await GameService.create(data)
    console.log(game)

  })


  it('Game crud', async () => {

    const users = await UserService.findMany({})
    const places = await PlaceService.findMany()

    const data = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: places[0].id,
      modalityId: 1,
      userId: users[0].id,
      teams: [53, 40]
    }
    /**
     * Create
     */
    const game = await GameService.create(data)
    expect(game).toHaveProperty('startHours', data.startHours)
    expect(game).toHaveProperty('teams')

    /**
     * Show
     */
    const gameShow = await GameService.findById(game.id)
    expect(gameShow).toHaveProperty('startHours')

    /**
     * Update
     */
    const gameUpdate = await GameService.update(game.id, { ...data, startHours: moment().format('HH:MM') })
    expect(gameUpdate).toHaveProperty('startHours', moment().format('HH:MM'))
    // expect(gameUpdate.teams).deep.equal(data.teams)

    /**
     * Delete
     */
    await GameService.delete(game.id)
  })

})