// Warwick Control Server
// Coded by Warwick Net Devs
// For inquiries, please contact: warwicknetdevs@gmail.com

// Create the server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// Import config
const config = require('./config.json');


// Keep some data in memory
var TemporaryData = {
  ConnectedUsers: 0
}

var notices = "none";

// show message when someone tries to directly access the server
// via the URL.
app.get('/', (req, res) => {
  res.send('<h1>Unsupported Request</h1>This server does not support requests from this browser. Are you using the WarwickBrowser?');
});


app.get('/netinfo', (req, res) => {
  res.send('<h1>WarwickNet Info</h1><b>Network is online</b><p>Connected Users: '+TemporaryData.ConnectedUsers+'</p><br><p>Notices: </p>' + notices);
});

// This handles Socket.io connections, the WarwickBrowser makes socket.io connections
io.on('connection', (socket) => {
  console.log("[CONNECT] Someone connected to the server.");
  ConnectedUsers++;
  // Send a welcome message to say they have connected
  // IN THE FUTURE DO AUTHENTICATION!
  socket.emit("welcome", {Online: TemporaryData.ConnectedUsers, ServerID: config.SERVER_ID})
});

// Listen for connections!
server.listen(config.LISTEN_PORT, () => {
  console.log(config.SERVER_ID + " is listening on *:"+ config.LISTEN_PORT);
});