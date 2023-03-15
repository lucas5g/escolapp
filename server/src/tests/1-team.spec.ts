import exp from "constants";
import { describe, expect, it } from "vitest";
import { TeamService } from "../services/TeamService";

describe('Team', () => {
  it('Team list', async () => {
    const teams = await TeamService.findMany()
    expect(teams.length).toBeGreaterThanOrEqual(1)

  })

  it('Team show', async () => {
    const team = await TeamService.findById(3)
    expect(team).toHaveProperty('name')
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
      name: 'Teat name team',
      modalityId: 1,
      groupId: 1,
      genreId: 3
    }

    /**
     * Create
     */
    const team = await TeamService.create(data)
    expect(team).toHaveProperty('name', data.name)

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