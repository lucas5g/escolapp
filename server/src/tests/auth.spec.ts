import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

describe('Auth', () => {

  let user = {
    name: '',
    email: '',
    id: 0
  }
  beforeAll(async () => {
    const data = {
      name: 'user login',
      email: 'auth@mail.com',
      password: '123456',
      profile: 'judge'
    }
    user = await UserService.create(data)

  })

  afterAll(async () => {
    await UserService.delete(user.id)
  })

  it('login user not found', async () => {
    const data = {
      email: 'test-error@mail.com',
      password: 'qweqwe'
    }

    const login = AuthService.login(data)
    await expect(() => login).rejects.toThrow('inválidos!')
  })

  it('login', async () => {

    const login = await AuthService.login({ ...user, password: '123456' })
    expect(login).toHaveProperty('accessToken')
    expect(login).not.toHaveProperty('password')
  })

  it('me', async () => {

    const me = await AuthService.me(user.id)
    expect(me).toHaveProperty('email')
    expect(me).not.toHaveProperty('password')

  })

  it('Update me', async () => {
    const data = {
      profile: 'manager',
      email: 'authNew@mail.com',
      name: 'user login update',
      password: 'qweqwe'
    }
    const me = await AuthService.updateMe(user.id, data)
    expect(me).not.contain({
      profile: data.profile,
      email: data.email
    })

    expect(me).contain({
      name: data.name
    })
    
    console.log(me)

  })

})