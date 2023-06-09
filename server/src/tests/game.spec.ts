import moment from "moment";
import { describe, expect, it } from "vitest";
import { GameService } from "../services/GameService";
import { PlaceService } from "../services/PlaceService";
import { UserService } from "../services/UserService";

describe('Game', () => {
  it.only('Game list', async () => {
    const games = await GameService.findMany()
    console.log(games[0].teams)
    games.forEach(game => {

      expect(game).toHaveProperty('modality')
      expect(game).toHaveProperty('user')
      expect(game).toHaveProperty('place')
      expect(game).toHaveProperty('teams')
      expect(game).toHaveProperty('datetime')
      expect(game.teams[0]).toHaveProperty('students')
      expect(game.teams[0]).toHaveProperty('goals')
      expect(game.teams[0]).toHaveProperty('points')
      
      // expect(game.teams[0]).toHaveProperty('name')
    })
  })


  // it('Game create', async () => {
  //   const data = {
  //     date: new Date().toISOString(),
  //     startHours: '07:00',
  //     endHours: '08:00',
  //     placeId: 1,
  //     modalityId: 1,
  //     userId: 1,
  //     teams: [53, 40]
  //   }

  //   const game = await GameService.create(data)

  // })


  it('Game crud', async () => {

    const users = await UserService.findMany({})
    const places = await PlaceService.findMany()

    const data = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: 1,
      modalityId: 1,
      userId: 1,
      teams: [
        {id: 1, goals: 1, points: 3},
        {id: 2, goals: 0, points: 1},
      ]
      // teams: [53, 40]
    }
    /**
     * Create
     */
    const game = await GameService.create(data)
    expect(game).toHaveProperty('startHours', data.startHours)
    expect(game).toHaveProperty('teams')

    return console.log(game)
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