import { describe, expect, it } from "vitest";
import { GroupService } from "../services/GroupService";
import { TeamService } from "../services/TeamService";

describe('Group', () => {
  it('Group list', async () => {

    const groups = await GroupService.findMany({unityId:2}) as any[]

    groups.forEach((group: any) => {
      expect(group).toHaveProperty('name')
      expect(group).toHaveProperty('unityId', 2)
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
      unityId:2 
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

  it('Try to delete a group that has a team', async () => {
    const group = {
      name: 'group with team',
      unityId: 2
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

    await expect(() => GroupService.delete(groupId)).rejects.toThrow('Possui Equipes')

    await TeamService.delete(teamId)
    await GroupService.delete(groupId)
  })

})