import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'

import {userUpdateSchema, userCreateSchema, userFilterSchema  } from '../utils/schemas'
export class UserService{

  static async findMany(data:any){
    const filter = userFilterSchema.parse(data)
    const users = await UserRepository.findMany(filter)
    return users
  }

  static async findById(id:number){
    return UserRepository.findById(id)
  }
  
  static async create(data: any){    

    const user = userCreateSchema.parse(data)

    if(await UserRepository.findByEmail(user.email)){
      throw new Error(`Já foi cadastrado o usuário com e-mail ${user.email}!`)
    }

    user.password = await bcrypt.hash(user.password, 12)

    return  await UserRepository.create(user)
  }

  static async update(id:number, data: any){

    const user = userUpdateSchema.parse(data)

    if(user.password){
      user.password = await bcrypt.hash(user.password, 12)
    }
    // console.log(user)
    return await UserRepository.update(id, user)
  }

  static async delete(id:number){
    return await  UserRepository.delete(id)
  }

}
