import { describe, expect, it } from "vitest";
import { TeamService } from "../services/TeamService";

describe('Team', () => {

  it('Team list', async () => {
    const teams = await TeamService.findMany()
    expect(teams).toBeTypeOf('object')
    console.log(teams)
  })

  it('Team find by modalityId', async () => {
    const modalityId = 5
    const teams = await TeamService.findMany({ modalityId })

    teams.forEach(team => {
      expect(team.modalityId).toEqual(modalityId)
    })

  })

  it.only('Team crud', async () => {

    const data = {
      name: 'Teat name team',
      modalityId: 1,
      groupId: 1,
      genreId: 3,
      studentsRaSelected: [
        "C150133",
        "C130265",
        "C120264"
      ]
    }
    
    /**
     * Create
     */
    const team = await TeamService.create(data)
    expect(team).toHaveProperty('name', data.name)

    /**
     * Show
     */
    // expect(await TeamService.findById(team.id)).toHaveProperty('name', data.name)


    /**
     * Try create same name exist
     */
    // await expect(() => TeamService.create(data)).rejects.toThrow('cadastrado')

    /**
     * Delete
     */
    await TeamService.delete(team.id)
  })
})