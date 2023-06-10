import { describe, expect, it } from "vitest";
import { TeamService } from "../services/TeamService";

describe('Team', () => {

  it('Team list', async () => {
    const teams = await TeamService.findMany()
    expect(teams).toBeTypeOf('object')
    teams.forEach(team => {
      expect(team).toHaveProperty('students')
      expect(team).toHaveProperty('modality')
    })
  })

  it('Team find by modalityId', async () => {
    const modalityId = 5
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
})