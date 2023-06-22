import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

(async() => {

  await prisma.game.deleteMany()
  await prisma.team.deleteMany() 
  await prisma.modality.deleteMany()

})()