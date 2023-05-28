import { describe, expect, it } from "vitest";
import { GroupService } from "../services/GroupService";

describe('Group', () => {
  it.only('Group list', async () => {
    const groups = await GroupService.findMany() as any[]
    console.log(groups)
    groups.forEach((group:any) => {
      expect(group).toHaveProperty('name')
      expect(group).toHaveProperty('unity')
      expect(group).toHaveProperty('quantity')
    })
  })

  it('Group show', async() => {
    const group = await GroupService.findById(1)
    expect(group).toHaveProperty('codcur')
  })

  it('Group crud', async() => {

    const data = {
     name: 'teste',
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
    const groupUpdate = await GroupService.update(group.id, {...data, name:'delele-group'})
    expect(groupUpdate).toHaveProperty('name', 'delete-group')
    // console.log(groupUpdate)
    /**
     * Delete
     */
    await GroupService.delete(group.id)
  })

})