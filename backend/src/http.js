const app = require("express")();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);


module.exports = { httpServer, io };