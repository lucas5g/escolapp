import { Request, Response, Router } from 'express'

import { AuthController } from './controllers/AuthController'
import { GameController } from './controllers/GameController'
import { GroupController } from './controllers/GroupController'
import { ModalityController } from './controllers/ModalityController'
import { PlaceController } from './controllers/PlaceController'
import { ProjectController } from './controllers/ProjectController'
import { StudentController } from './controllers/StudentController'
import { TeamController } from './controllers/TeamController'
import { UserController } from './controllers/UserController'

import { auth } from './utils/auth'
import { errors } from './utils/errors'
import { ConfigController } from './controllers/ConfigController'
import { PointController } from './controllers/PointController'
import { permission } from './utils/permission'
import { UnityController } from './controllers/UnityController'

export const routes = Router()

/**
 * Default
 */
routes.get('/', (req:Request, res:Response) => res.json({api: 'Release api 2023-06-23 17:00'}))
routes.post('/login', AuthController.login)
routes.get('/clear-caches', ConfigController.clearCaches)

/**
 * Middleawares
 */
routes.use(auth)

/**
 * Auth
 */
routes.get('/me', AuthController.me)
routes.put('/update-me', AuthController.updateMe)

// routes.use(permission('judge'))
routes.get('/users', UserController.index)
routes.get('/modalities', ModalityController.index)
routes.get('/games', GameController.index)
routes.get('/students', StudentController.index)
routes.get('/places', PlaceController.index)
routes.get('/teams', TeamController.index)




/**
 * Routes for admin
 */

routes.use(permission('manager', 'coordinator'))

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
routes.post('/groups', GroupController.create)
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
// routes.get('/students/:id', StudentController.show)
// routes.post('/students', StudentController.create)
// routes.put('/students/:id', StudentController.update)
// routes.delete('/students/:id',StudentController.delete)

/**
 * Games
 */
routes.get('/games', permission('judge'), GameController.index)
routes.get('/games/:id', GameController.show)
routes.post('/games', GameController.create)
routes.put('/games/:id', GameController.update)
routes.delete('/games/:id',GameController.delete)


/**
 * Projects
 */
routes.get('/projects', ProjectController.index)


/**
 * Teams
 */
routes.get('/teams', TeamController.index)
routes.get('/teams/:id', TeamController.show)
routes.post('/teams', TeamController.create)
routes.put('/teams/:id', TeamController.update)
routes.delete('/teams/:id',TeamController.delete)

/**
 * Points
 */
routes.get('/points', PointController.index)

/**
 * Unities
 */
routes.get('/unities', UnityController.index)
routes.get('/unities/:id', UnityController.show)
routes.put('/unities/:id', UnityController.update)
routes.post('/unities', UnityController.create)
routes.use(errors)


