import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({port : 8090})

wsServer.on("connection" , function connection(wss , request){
  const url = request.url;
  if(!url){
    return
  }
  const queryParam = new URLSearchParams(url.split("?")[1])
  const token = queryParam.get("token")
  
  wss.on("message" , function sendMessage(data){
    wss.send("Hey There Web socket server has also started")
  })
})