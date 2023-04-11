import Router from 'koa-router'
import rustController from '../controllers/rust.js'

const routerInit = new Router({ prefix: '/api' })

routerInit.post('/login', rustController.login)
routerInit.post('/currentUser', rustController.getCurrentUser)
routerInit.post('/ab/get', rustController.getAbs)
routerInit.post('/ab', rustController.addAb)
routerInit.post('/currentUser', rustController.updateAb)
routerInit.post('/audit', rustController.audit)
routerInit.post('/logout', rustController.logout)

export default routerInit