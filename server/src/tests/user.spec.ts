import { describe, expect, it } from 'vitest'
import { UserService } from '../services/UserService'

describe('User', () => {

  it('User list', async () => {

    const users = await UserService.findMany({})
    users.forEach(user => {
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('unityId')
      expect(user).not.toHaveProperty('password')
      
    })
  })

  it('User find by profile', async() => {
    const users = await UserService.findMany({profile:'judge'})
    users.forEach(user => {
      expect(user).toContain({profile:'judge'})
    })
  })


  it('User create', async() => {
    const data = {
      name:`lucas test ${new Date().getMinutes()}`,
      email:'test1@mail.com',
      password: 'login123',
      unityId: 1,
      profile: 'manager'
    }
    const user = await UserService.create(data)

    expect(user).toContain({name: data.name})
    UserService.delete(user.id)
  })

  it('User crud', async () => {

    const data = {
      email: 'test-delete@mail.com',
      name: `admin ${new Date().getMinutes()}`,
      password: 'qweqwe',
      unityId: 2,
      profile: 'judge'
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