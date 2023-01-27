import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthController } from "./controllers/AuthController";
import { GroupController } from "./controllers/GroupController";


export async function routesPublic(app:FastifyInstance){
  app.post('/login', AuthController.login)
}

export async function routesPrivate(app: FastifyInstance) {

  
  app.addHook('onRequest', async(req, reply) => req.jwtVerify())
  //   try{
  //     await req.jwtVerify({})
  //   }catch(error){
  //     return error 
  //   }
  // })

  /**
   * me
   */
  app.get('/me', AuthController.me)

  /**
   * Groups
   */

  
  app.post('/groups', GroupController.create)
  app.get('/groups', GroupController.index)
  app.get('/groups/:id', GroupController.show)
  app.put('/groups/:id', GroupController.update)
  app.delete('/groups/:id', GroupController.delete)



}