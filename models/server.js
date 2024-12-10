const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const messageRoutes = require("../routes/messages"); // Importar las rutas

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.DB_PORT || 8080;
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server, {
      /* Configuraciones */
    });

    this.middlewares();
    this.configurarSockets();
    this.routes(); // Configurar rutas
  }

  middlewares() {
    // Serve static files
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // Middleware para parsear JSON
    this.app.use(express.json());
  }

  routes() {
    // Usar las rutas de mensajes
    this.app.use("/api", messageRoutes);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar server
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
