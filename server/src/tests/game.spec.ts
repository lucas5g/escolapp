import moment from "moment";
import { describe, expect, it } from "vitest";
import { GameService } from "../services/GameService";

describe('Game', () => {
  it('Game list', async () => {
    const games = await GameService.findMany({})
    games.forEach(game => {
      expect(game).toHaveProperty('modality')
      expect(game).toHaveProperty('user')
      expect(game).toHaveProperty('place')
      expect(game).toHaveProperty('teams')
      expect(game).toHaveProperty('datetime')
      expect(game.teams[0]).toHaveProperty('students')
      expect(game.teams[0]).toHaveProperty('goals')
      expect(game.teams[0]).toHaveProperty('points') 
      expect(game.teams[0]).toHaveProperty('fairPlay') 

      
    })
  }, 5000)

  it('Game crud', async () => {

    const data = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: 1,
      modalityId: 1,
      userId: 1,
      teams: [
        {id: 1, goals: 1, fairPlay:0,  points: 3},
        {id: 2, goals: 0, fairPlay:0,  points: 1},
      ]
      // teams: [53, 40]
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

  it('List game by userId', async() => {
    const userId = 73
    const date = moment(moment().format('YYYY-MM-DD')).toISOString()
    const games = await GameService.findMany({userId, date})
    // console.log(games)
    games.forEach(game => {
      expect(game).contain({userId})
    })

  }, 5100)

})