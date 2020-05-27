ws.onopen = () => {
  console.log("客户端连接成功");
}
ws.onmessage = (msg) => {
  console.log(msg.data);

  if (msg.data.indexOf('当前在线人数') > -1) {

    app.onlineQuantity = msg.data.split('：')[2]
  }
  app.msgList.unshift(msg.data)

}
ws.onclose = () => {
  console.log("服务器主动断开连接");
}