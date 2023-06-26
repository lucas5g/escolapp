import { describe, expect, it } from "vitest";
import { SetupServive } from "../services/SetupService";

describe('Setup', () => {
  it('Create setup', async() => {

    const data = {
      documentLink: 'https://drive.google.com/drive/folders/18XwnFVAuLfwOXZ4mcwfscj_u1JqEAUIQ?usp=drive_link',
      unityId: 2
    }

    const setup = await SetupServive.create(data)
    expect(setup).contain(data)

    await SetupServive.delete(setup.id)
  })

  it('Update setup', async() => {
    const data = {
      documentLink: 'https://docs.google.com/document/d/1U0uJvTwSmepAQZgiPAlbNiqYBY4RggBCV4bjtO5H9zY/edit?usp=drive_link',
      unityId: 2
    }

    const setup = await SetupServive.update(1, data)
    expect(setup).contain(data)
  })

  it('List setup', async() => {
    const setups = await SetupServive.findMany({unityId: 2})
    setups.forEach(setup => {
      expect(setup).toHaveProperty('unityId', 2)
    })
    console.log(setups)
  })

  it('Show setup', async() => {
    const setup = await SetupServive.findById(1)
    expect(setup).toHaveProperty('unityId')
    expect(setup).toHaveProperty('documentLink')
  })

})