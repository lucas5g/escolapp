import { describe, expect, it } from 'vitest'
import { UserService } from '../services/UserService'



describe('User', () => {

  it('User list', async () => {

    const users = await UserService.findMany()
    expect(users.length).toBeGreaterThanOrEqual(1)

  })

  it('User show', async () => {
    const user = await UserService.findById(1)
    expect(user).be
  })

  it('User crud', async () => {

    const data = {
      email: 'test-delete@mail.com',
      name: `admin ${new Date().getMinutes()}`,
      password: 'qweqwe'
    }

    /**
     * Create
     */
    const user = await UserService.create(data)
    expect(user).toHaveProperty('email', data.email)

    /**
    * Update
    */
    const userUpdate = await UserService.update(user.id, { ...data, name: 'update' })
    expect(userUpdate).toHaveProperty('name', 'update')

    /**
     * Delete
     */
    await UserService.delete(user.id)
  })

})