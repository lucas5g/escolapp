import { describe, expect, it } from "vitest";
import { GroupService } from "../services/GroupService";
import { env } from "../utils/env";
import { TeamService } from "../services/TeamService";

describe('Group', () => {
  it('Group list', async () => {

    // return console.log(env.googleFile)
    const groups = await GroupService.findMany() as any[]
    // expect(groups).deep.equal(groups.sort((a, b) => a.name.localeCompare(b)))
    groups.forEach((group: any) => {
      expect(group).toHaveProperty('name')
      expect(group).toHaveProperty('unity')
      expect(group).toHaveProperty('quantity')
    })
  })

  it('Group show', async () => {
    const group = await GroupService.findById(1)
    expect(group).not.toHaveProperty('codcur')
  })

  it('Group crud', async () => {

    const data = {
      name: 'delete',
      unity: 'contagem'
    }
    /**
     * Create
     */
    const group = await GroupService.create(data)
    expect(group).toHaveProperty('name', data.name)

    /**
     * Update
     */
    const groupUpdate = await GroupService.update(group.id, { ...data, name: 'delete-group' })
    expect(groupUpdate).toHaveProperty('name', 'delete-group')
    /**
     * Delete
     */
    await GroupService.delete(group.id)
  })

  it.skip('Try to delete a class that has a team', async () => {
    const group = {
      name: 'group with team',
      unity: 'contagem'
    }

    const {id:groupId} = await GroupService.create(group)

    const team = {
      name: 'team del',
      students: ['c123123', 'c132132'],
      modalityId: 1,
      groupId,
      genreId:1

    }

    const { id: teamId} = await TeamService.create(team)

    await GroupService.delete(groupId)

    console.log(groupId, teamId)
  })

})