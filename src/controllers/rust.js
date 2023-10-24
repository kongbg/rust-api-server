import Path from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


const __dirname = Path.resolve();
const filePath = `${Path.join(__dirname)}/src/data/db.json`
// console.log(filePath);
const adapter = new JSONFile(filePath)
const db = new Low(adapter)
await db.read()

if (!db.data){
  db.data = { 
    rust: {
        users: [
            {
              id: 'r001',
              username: 'admin',
              password: 'admin.',
              token: '',
              uuid: ''
            }
        ],
        tags: [],
        peers: []
    }
  }
  await db.write()
}


const rust = db.data.rust;
export default class rustController {
    /**
     * 登录接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async login(ctx) {
      // 入参：
      // {
      //   username: '111',
      //   password: '222',
      //   id: '399025060',
      //   uuid: 'MWYxMDQxZTQtYmM1YS00MjRmLWIzNzUtYjU4OTdjOGViZDM1'
      // }
      // 成功出参：
      // {
      //   access_token: '',
      //   user: {
      //     "name": 'admin'
      //   }
      // }
      // 失败出参：
      // {
      //   error: '失败失败'
      // }

      const params = ctx.request.body;
      // console.log('login:', params)
      let result = {}
      let info = rust.users.find(item => {
        return item.username == params.username;
      })

      if (info && info.password == params.password) {
        info.uuid = params.uuid;
        info.token = `${info.id}@${info.username}`
        await db.write()
        result = {
          type: 'access_token',
          access_token: info.token,
          user: {
            "name": info.username
          }
        }
      } else if (info && info.password != params.password) {
        result = {
          error: "密码错误"
        }
      } else if (!info) {
        result = {
          error:"用户不存在"
        }
      }
      ctx.body = result;
    }

    /**
     * 获取当前登录用户接口
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getCurrentUser(ctx) {
      // 入参：
      // {"id":"399025060","uuid":"MWYxMDQxZTQtYmM1YS00MjRmLWIzNzUtYjU4OTdjOGViZDM1"}
      // 成功出参：
      // {
      //   error: false,
      //   data: {
      //     name:"用户名"
      //   }
      // }
      // 失败出参：
      // {
      //   error: '失败失败'
      // }

      const params = ctx.request.body;
      // console.log('getCurrentUser:', params);
      const token = ctx.request.header.authorization.replace('Bearer ', '');
      let result = {}
      let info = rust.users.find(item => {
        return item.token == token;
      })

      if (info) {
        result = {
          error: false,
          data: {
            name: info.username
          }
        }
      } else {
        result = {
          error:"用户不存在"
        }
      }
      ctx.body = result;
    }

    /**
     * 更新地址薄
     * @param {Context} ctx
     * @memberof rustController
     */
    static async addAb(ctx) {
      let result = {};
      const params = ctx.request.body;
      const token = ctx.request.header.authorization.replace('Bearer ', '');
      const userInfo = rust.users.find(item=> {
        return item.token == token;
      })
      const data = JSON.parse(params.data)
      // console.log('addAb:', data)

      const tag = rust.tags.find(item => item.user_id == userInfo?.id);
      if (tag) {
        tag.tags = data.tags
      } else {
        rust.tags.push({
          user_id: userInfo?.id,
          tags: data?.tags
        })
      }

      const peer = rust.peers.find(item => item.user_id == userInfo.id);
      if (peer) {
        peer.peers = data.peers
      } else {
        rust.peers.push({
          user_id: userInfo.id,
          peers: data.peers
        })
      }
      await db.write()
      result = {
        data:"成功成功"
      }
      ctx.body = result
    }

    /**
     * 获取地址薄
     * @param {Context} ctx
     * @memberof rustController
     */
    static async getAbs(ctx) {
      let result = {}
      const token = ctx.request.header.authorization.replace('Bearer ', '');
      const userInfo = rust.users.find(item=> {
        return item.token == token;
      })

      if (!userInfo) {
        return ctx.body = {
          error: 'token有误'
        }
      }

      let method = ctx.request.method;
      // console.log('getAbs:', method, userInfo)
      if (method === 'GET') {
        let user_id = userInfo.id;
        // 获取tags
        const tagInfo = rust.tags.find(item=> {
          return item.user_id == user_id;
        })
        // console.log('tagInfo:', tagInfo)

        // 获取peers
        const peerInfo = rust.peers.find(item=> {
          return item.user_id == user_id;
        })
        // console.log('peerInfo:', peerInfo)

        result = {
          // updated_at: '',
          data: JSON.stringify({
            tags: tagInfo?.tags || [],
            peers: peerInfo?.peers || []
          })
        }

        // result = {
        //   error:"获取地址簿有误"
        // }
        ctx.body = result
      } else if (method === 'POST') {
        if (userInfo) {
          const peer = rust.peers.find(item => {
            return item.user_id == userInfo.id;
          })
          const tag = rust.tags.find(item => {
            return item.user_id == userInfo.id;
          })
          result = {
            error: false,
            updated_at: "2022-09-23 12:00:22",// TODO
            data: JSON.stringify({tags: tag?.tags || [], peers: peer?.peers || []})
          }

        } else {
          result = {
            error: 'token有误'
          }
        }
        ctx.body = result
      }
    }

    /**
     * 更新地址薄及标签接口
     * @param {Context} ctx
     * @memberof rustController
     */
     static async updateAb(ctx) {
      // TODO: 没发现哪里会调这个接口
      const params = ctx.request.body;
      // console.log('updateAb:', params)
      // {"data":"{"tags":["标签1","标签2"],"peers":[{"id":"设备一ID","username":"","hostname":"","alias":"设备别名1","platform":"","tags":["设备标签"]},{"id":"设备二设备ID","username":"Admin","hostname":"","alias":"设备别名2","platform":"linux","tags":["设备标签"]}]}"}
      ctx.body = {
        data:"成功成功"
      }
    }

    /**
     * 心跳
     * @param {Context} ctx
     * @memberof rustController
     */
    static async audit(ctx) {
      // console.log('audit:')
      ctx.body = {
        data:"成功成功"
      }
    }

    /**
     * 登出
     * @param {Context} ctx
     * @memberof rustController
     */
    static async logout(ctx) {
      // console.log('logout')
      // TODO： koa-jwt
      const token = ctx.request.header.authorization.replace('Bearer ', '');
      let result = {}
      const info = rust.users.find(item => item.token === token)
      if (info) {
        info.token = ''
        await db.write()
        result = {
          data:"退出成功"
        }
      } else {
        result = {
          error:"退出失败"
        }
      }
      ctx.body = result;
    }

    /**
     * 获取组信息
     * @param {Context} ctx
     * @memberof rustController
     */
    static  getUsersGroup(ctx) {
      // console.log('getUsersGroup:', ctx)
      let result = {
        error: "获取组信息失败"
      }
      ctx.body = result
    }
  }