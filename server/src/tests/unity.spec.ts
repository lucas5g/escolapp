import { describe, expect, it } from "vitest";
import { UnityService } from "../services/UnityService";

describe('Unity', () => {
  it('Unity list', async () => {

    const unities = await UnityService.findMany() 
    unities.forEach((group: any) => {
      expect(group).toHaveProperty('name')
    })
  })

  it('Unity show', async () => {
    const unity = await UnityService.findById(1)
    expect(unity).toHaveProperty('name')
  })

  it('Unity update', async() => {
    const name = `test unity ${new Date().toISOString()}`
    const unity = await UnityService.update(3, {name })
    expect(unity).contain({
      name
    })
  })

  it('Unity create and delete', async() => {
    const name = `test unity del ${new Date().toISOString()}`

    const unity = await UnityService.create({name})
    expect(unity).contain({name})

    await UnityService.delete(unity.id)
  })
})