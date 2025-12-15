import { WebSocketServer } from "ws";

const wsServer = new WebSocketServer({port : 8090})

wsServer.on("connection" , function connection(wss){
  wss.on("message" , function sendMessage(data){
    wss.send("Hey There Web socket server has also started")
  })
})