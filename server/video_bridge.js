function video_bridge(udpPort,websocketPort) {

  const dgram = require('dgram');
  const WebSocket = require('ws');
  
  const udpSocket = dgram.createSocket('udp4');
  
  const wss = new WebSocket.Server({ port: websocketPort });
  
  
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
  
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
  
  udpSocket.on('message', (msg, rinfo) => {
    
  
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  udpSocket.bind(udpPort, () => {
    console.log('UDP server started on port', udpPort);
  });
  
  
  wss.on('listening', () => {
    console.log('WebSocket server started on port', websocketPort);
  });
  

}

module.exports = {
  video_bridge
};