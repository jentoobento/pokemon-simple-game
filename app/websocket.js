const WebSocket = require('ws');

var clients = {}
const webSocketConfig = () => {
    const webSocketServer = new WebSocket.Server({ port: 8181 }); // new server is now running on new port

    webSocketServer.on('connection', (webSocket, req) => {
        // currentUserId = req.url.split('/')[1]
        // clients[currentUserId] = webSocket // { key: userId, value: webSocket }

        webSocket.on('message', messageFromClient => {
            console.log('WEBSOCKET RESPONSE:', messageFromClient)
            // clients[result.recipientId].send(JSON.stringify(result))
            webSocket.send('hey')
        })


        console.log("Websocket on port: 8181") // this will run when the page refreshes/loads
    })
}

module.exports = {
    webSocketConfig: webSocketConfig
}
