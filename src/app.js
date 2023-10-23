import Koa from 'koa'
import Rust from './routes/rust.js'
import BodyParser from 'koa-bodyparser'


const app = new Koa()
// 用于发现未定义的路由
// app.use(async (ctx, next)=>{
//     try{
//         await next();   // 执行后代的代码
//         console.log('执行后代的代码', '404',ctx)
//         if(!ctx.body){  // 没有资源
//             ctx.body = "404"
//         }
//     }catch(e){
//         // 如果后面的代码报错 返回500
//         ctx.body = "500"
//         console.log('执行后代的代码', '500, ctx)
//     }
// })

// ctx.body
app.use(BodyParser())

app.use(Rust.routes()).use(Rust.allowedMethods())

app.listen(21114)