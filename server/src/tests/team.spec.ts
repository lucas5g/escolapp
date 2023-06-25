import { describe, expect, it } from "vitest";
import { TeamService } from "../services/TeamService";
import { GameService } from "../services/GameService";

describe('Team', () => {

  it('Team list', async () => {
    const teams = await TeamService.findMany({})
    expect(teams).toBeTypeOf('object')
    teams.forEach(team => {
      expect(team).toHaveProperty('students')
      expect(team).toHaveProperty('modality')
    })
  })

  it('Team find by modalityId', async () => {
    const modalityId = 3
    const teams = await TeamService.findMany({ modalityId })

    teams.forEach(team => {
      expect(team.modalityId).toEqual(modalityId)
    })

  })

  it('Team crud', async () => {

    const data = {
      name: 'Team delete',
      modalityId: 1,
      groupId: 1,
      genreId: 3,
      students: [
        'C123123',
        'C111222'
      ]
    }

    /**
     * Create
     */
    const team = await TeamService.create(data)
    expect(team).toHaveProperty('name', data.name)

    expect(await TeamService.update(team.id, data))

    /**
     * Show
     */
    const teamShow = await TeamService.findById(team.id)
    expect(teamShow).toHaveProperty('name', data.name)

    /**
     * Try create same name exist
     */
    await expect(() => TeamService.create(data)).rejects.toThrow('cadastrado')

    /**
     * Delete
     */
    await TeamService.delete(team.id)
  })

  it('Try to delete team that has a game', async() => {

    const team = {
      name: 'Team delete',
      modalityId: 1,
      groupId: 1,
      genreId: 3,
      students: [
        'C123123',
        'C111222'
      ]
    }

    const { id: teamId } = await TeamService.create(team)

    
    const game = {
      date: new Date().toISOString(),
      startHours: '07:00',
      endHours: '08:00',
      placeId: 1,
      modalityId: 1,
      userId: 1,
      teams: [
        {id: teamId, goals: 1, fairPlay:0,  points: 3},
        {id: 2, goals: 0, fairPlay:0,  points: 1},
      ]
    }
    const {id: gameId } = await GameService.create(game)

    await expect(() => TeamService.delete(teamId)).rejects.toThrow('Possui jogos com essa equipe.')
    await GameService.delete(gameId)
    await TeamService.delete(teamId)

  })

})

