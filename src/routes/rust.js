import Router from 'koa-router'
import rustController from '../controllers/rust.js'

const routerInit = new Router({ prefix: '/api' })

routerInit.post('/login', rustController.login)
routerInit.post('/currentUser', rustController.getCurrentUser)//?
routerInit.post('/ab/get', rustController.getAbs)
routerInit.post('/ab', rustController.addAb)
routerInit.post('/currentUser', rustController.updateAb)//?为甚么两个路径一样？忘记了。。。
routerInit.post('/audit', rustController.audit)
routerInit.post('/logout', rustController.logout)

routerInit.get('/ab', rustController.getAbs) //v1.2.2版本以后
routerInit.get('/users', rustController.getUsersGroup) //v1.2.2版本以后,当前不可用，客户端报错

export default routerInit