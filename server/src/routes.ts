import { Request, Response, Router } from 'express'

import { AuthController } from './controllers/AuthController'
import { CourseController } from './controllers/CourseController'
import { GameController } from './controllers/GameController'
import { GroupController } from './controllers/GroupController'
import { ModalityController } from './controllers/ModalityController'
import { PlaceController } from './controllers/PlaceController'
import { ProjectController } from './controllers/ProjectController'
import { StudentController } from './controllers/StudentController'
import { TeamController } from './controllers/TeamController'
import { UserController } from './controllers/UserController'

import { auth } from './utils/auth'
import { AuthBodySchema, GameBodySchema, GroupBodySchema } from './utils/schemas'
import { validation } from './utils/validation'

export const routes = Router()

/**
 * Default
 */
routes.get('/', (req:Request, res:Response) => res.json({api: 'Test api 01/02 01'}))
routes.post('/login', validation(AuthBodySchema), AuthController.login)


/**
 * Auth routes
 */
routes.use(auth)

/**
 * Users
 */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

/**
 * Groups
 */
routes.get('/groups', GroupController.index)
routes.get('/groups/:id', GroupController.show)
routes.post('/groups', validation(GroupBodySchema), GroupController.create)
routes.put('/groups/:id', GroupController.update)
routes.delete('/groups/:id',GroupController.delete)

/**
 * Modalities
 */
routes.get('/modalities', ModalityController.index)
routes.get('/modalities/:id', ModalityController.show)
routes.post('/modalities', ModalityController.create)
routes.put('/modalities/:id', ModalityController.update)
routes.delete('/modalities/:id',ModalityController.delete)

/**
 * Places
 */
routes.get('/places', PlaceController.index)
routes.get('/places/:id', PlaceController.show)
routes.post('/places', PlaceController.create)
routes.put('/places/:id', PlaceController.update)
routes.delete('/places/:id',PlaceController.delete)

/**
 * Students
 */
routes.get('/students', StudentController.index)
routes.get('/students/:ra', StudentController.show)
routes.post('/students', StudentController.create)
routes.put('/students/:ra', StudentController.update)
routes.delete('/students/:ra',StudentController.delete)

/**
 * Games
 */
routes.get('/games', GameController.index)
routes.get('/games/:id', GameController.show)
routes.post('/games', validation(GameBodySchema), GameController.create)
routes.put('/games/:id', validation(GameBodySchema), GameController.update)
routes.delete('/games/:id',GameController.delete)


/**
 * Projects
 */
routes.get('/projects', ProjectController.index)

/**
 * Courses
 */
routes.get('/courses', CourseController.index)

/**
 * Teams
 */
routes.get('/teams', TeamController.index)
routes.get('/teams/:id', TeamController.show)
routes.post('/teams', TeamController.create)
routes.put('/teams/:id', TeamController.update)
routes.delete('/teams/:id',TeamController.delete)


/**
 * Auth
 */
routes.get('/me', AuthController.me)

