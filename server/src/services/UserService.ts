import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'

import {UserUpdateType, userCreateType, userUpdateSchema } from '../utils/schemas'
export class UserService{

  static async findMany(){
    return UserRepository.findMany()
  }

  static async findById(id:number){
    return UserRepository.findById(id)
  }
  
  static async create(data: userCreateType){

    if(await UserRepository.findByEmail(data.email)){
      throw new Error(`Já foi cadastrado o usuário com e-mail ${data.email}!`)
    }

    data.password = await bcrypt.hash(data.password, 12)

    return  await UserRepository.create(data)
  }

  static async update(id:number, body: UserUpdateType){

    const data = userUpdateSchema.parse(body)

    if(data.password){
      data.password = await bcrypt.hash(data.password, 12)
    }

    return await UserRepository.update(id, data)
  }

  static async delete(id:number){
    return await  UserRepository.delete(id)
  }

}
