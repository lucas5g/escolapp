import { describe, expect, it } from 'vitest'
import { UserService } from '@/services/UserService'
import { AuthService } from '@/services/AuthService'

describe('User', () => {

  it.only('User list', async () => {

    const users = await UserService.findMany({})
    expect(users.length).toBeGreaterThanOrEqual(0)
  })

  it('User find by profile', async() => {
    const users = await UserService.findMany({profile:'judge'})
    users.forEach(user => {
      expect(user).toContain({profile:'judge'})
    })
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
     * Show
     */
    const userShow = await UserService.findById(user.id)
    expect(userShow).toHaveProperty('email', data.email)

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