import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

(async() => {
  
  try{
    await prisma.$disconnect()

  }catch(e){
    console.log(e)
    await prisma.$disconnect()
  } 

})()
