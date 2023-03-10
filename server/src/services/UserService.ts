import { UserRepository } from "../repositories/UserRepository";
import { UserCreateSchema, UserCreateType } from "../utils/schemas";
import bcrypt from 'bcrypt'

export class UserService{

  static async findMany(){
    return UserRepository.findMany()
  }

  static async show(id:number){
    return UserRepository.show(id)
  }
  
  static async create(data:UserCreateType){

    if(await UserRepository.findByEmail(data.email)){
      // throw new Error().message = `Já foi cadastrado o usuário com e-mail ${data.email}!`
      throw new Error(`Já foi cadastrado o usuário com e-mail ${data.email}!`)

    }

    data.password = await bcrypt.hash(data.password, 12)

    return  UserRepository.create(data)
  }

  // static async 
}
