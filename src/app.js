import Koa from 'koa'
import Rust from './routes/rust.js'
import BodyParser from 'koa-bodyparser'


const app = new Koa()

// ctx.body
app.use(BodyParser())

app.use(Rust.routes()).use(Rust.allowedMethods())

app.listen(6200)