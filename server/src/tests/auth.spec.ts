import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

describe('Auth', () => {

  let user = {
    name: '',
    email:'',
    id:0
  }
  beforeAll(async() => {
    user = await UserService.create({name: 'user login', email:'auth@mail.com', password:'123456'})

  })

  afterAll(async() => {
    console.log({user})
    await UserService.delete(user.id)
  })

  it('login user not found', async() => {
    const data = {
      email: 'test-error@mail.com',
      password: 'qweqwe'
    }
   
    const login =  AuthService.login(data)
    await expect(() => login ).rejects.toThrow('inválidos!')
  })

  it('login', async() => {
 
    const login = await AuthService.login({...user, password: '123456'})
    expect(login).toHaveProperty('accessToken')
    expect(login).not.toHaveProperty('password')
  })

  it.only('me', async() => {


    const me = await AuthService.me(user.id)
    expect(me).toHaveProperty('email')
    expect(me).not.toHaveProperty('password')
   
  })


})