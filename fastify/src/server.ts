import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import 'dotenv/config'


import { routesPrivate, routesPublic } from './routes'

export const app = fastify()

app.register(jwt, {
  secret: process.env.SECRET_TOKEN || '',
  
})
app.register(cors)
app.register(routesPublic)
app.register(routesPrivate)

app.listen({
  port: Number(process.env.PORT)
}).then(() => {
  console.log(`Server run - http://localhost:${process.env.PORT}`)
})