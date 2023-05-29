import { describe, expect, it } from "vitest";
import { GroupService } from "../services/GroupService";
import { env } from "../utils/env";

describe('Group', () => {
  it('Group list', async () => {

    // return console.log(env.googleFile)
    const groups = await GroupService.findMany() as any[]
    // expect(groups).deep.equal(groups.sort((a, b) => a.name.localeCompare(b)))
    groups.forEach((group:any) => {
      expect(group).toHaveProperty('name')
      expect(group).toHaveProperty('unity')
      expect(group).toHaveProperty('quantity')
    })
  })

  it('Group show', async() => {
    const group = await GroupService.findById(1)
    expect(group).not.toHaveProperty('codcur')
  })

  it('Group crud', async() => {

    const data = {
     name: 'delete',
     unity:'contagem'
    }
    /**
     * Create
     */
    const group = await GroupService.create(data)
    expect(group).toHaveProperty('name', data.name)

    /**
     * Update
     */
    const groupUpdate = await GroupService.update(group.id, {...data, name:'delete-group'})
    expect(groupUpdate).toHaveProperty('name', 'delete-group')
    /**
     * Delete
     */
    await GroupService.delete(group.id)
  })

})