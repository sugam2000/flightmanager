function data_bridge(udpPort,websoketport) {
  
  const WebSocket = require('ws');
const dgram = require('dgram');

const udpSocket = dgram.createSocket('udp4');

const wss = new WebSocket.Server({ port: websoketport }); // Change the port if needed

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');


  ws.on('message', (message) => {
    // Replace the IP address with your esp32 IP address
    const udpMessage = Buffer.from(message);
    udpSocket.send(udpMessage, 0, udpMessage.length, 5000, '192.168.202.38', (err) => {
      if (err) {
        console.log('Error sending UDP message:', err);
      } 
    });
  });

  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

udpSocket.on('message', (msg, rinfo) => {
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
});

udpSocket.on('error', (err) => {
  console.log('UDP socket error:', err);
});


udpSocket.bind(udpPort);
console.log(`UDP socket listening on port ${udpPort}`);


wss.on('error', (err) => {
  console.log('WebSocket server error:', err);
});

process.on('exit', () => {
  udpSocket.close();
  wss.close();
});

console.log('WebSocket to UDP bridge started');
}

module.exports = {
  data_bridge
};

