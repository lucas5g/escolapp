import { describe, expect, it } from "vitest";
import { AuthService } from "../services/AuthService";

describe('Auth', () => {
  it('login user not found', async() => {
    const data = {
      email: 'test-error@mail.com',
      password: 'qweqwe'
    }
   
    const login =  AuthService.login(data)
    await expect(() => login ).rejects.toThrow('inválidos!')
  })

  it('login', async() => {
    const data = {
      email: 'test@mail.com',
      password: 'qweqwe'
    }

    const login = await AuthService.login(data)
    expect(login).toHaveProperty('accessToken')
    expect(login).not.toHaveProperty('password')
  })

  it('me', async() => {
    const user = await AuthService.me(1)
    expect(user).toHaveProperty('email')
    expect(user).not.toHaveProperty('password')
    
    console.log(user)
  })


})