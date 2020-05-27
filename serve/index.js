const WebSocket = require("ws")
const msgDB = require('../db/msg')
const ws = new WebSocket.Server({
  port: 8080
}, () => {
  console.log("WebSocket在8080端口运行...")
})

let clients = []

ws.on('connection', async (client, req) => {
  clients.push({
    client,
    req
  })
  console.log(req.connection.remoteAddress);
  sendAll(`当前在线人数：${clients.length}`)
  client.send("欢迎进入聊天室!")
  let data = await msgDB.find()

  data.forEach(item => {
    client.send(item.msg)
  })

  // client.send(JSON.stringify(data))
  sendAll('欢迎新成员加入聊天室！')
  client.on('message', (msg) => {
    console.log("来自客户端的数据" + msg);
    sendAll(msg)
    msgDB.insertMany({
      msg: `${req.connection.remoteAddress} ：${msg}`
    }).catch((err) => {
      if (err) {
        console.log("入库失败" + err);
      }
    })
  })
  client.on('close', () => {
    console.log("客户端断开连接");
    // let i = clients.findIndex(client)
    clients = clients.filter((item) => {
      return item.client != client
    })
    // console.log(clients);
    sendAll(`当前在线人数：${clients.length}`)

  })
})

function sendAll(msg) {
  clients.forEach((item, i) => {
    item.client.send(`${item.req.connection.remoteAddress} ：${msg}`)
  })
}