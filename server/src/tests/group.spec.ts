import { describe, expect, it } from "vitest";
import { GroupService } from "../services/GroupService";

describe('Group', () => {
  it('Group list', async () => {
    const groups = await GroupService.findMany()
    expect(groups.length).toBeGreaterThan(0)
  })

  it('Group show', async() => {
    const group = await GroupService.findById(1)
    expect(group).toHaveProperty('codcur')
  })

  it('Group crud', async() => {

    const data = {
     name: 'teste',
     codcur:22,
     codper:1
    }
    /**
     * Create
     */
    const group = await GroupService.create(data)
    expect(group).toHaveProperty('name', data.name)

    /**
     * Update
     */
    const groupUpdate = await GroupService.update(group.id, {...data, codper:4 })
    expect(groupUpdate).toHaveProperty('codper', 4)
    // console.log(groupUpdate)
    /**
     * Delete
     */
    await GroupService.delete(group.id)
  })

})