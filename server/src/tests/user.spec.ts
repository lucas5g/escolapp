import { describe, expect, it } from 'vitest'
import { UserService } from '../services/UserService'

const data = {

  email: 'admin@mail.com',
  name: `admin ${new Date().getMinutes()}`,
  password: 'qweqwe'
}

describe('User', () => {


  it('User list', async() => {

    const users = await UserService.findMany()
    expect(users.length).toBeGreaterThanOrEqual(1)

  })

  it('User show', async() => {
    const user = await UserService.show(1)
    expect(user).be
  })

  it.only('User create', async() => {
    const user = await UserService.create(data)
    // console.log(user)
    expect(user).toHaveProperty('email', data.email)
  })


})