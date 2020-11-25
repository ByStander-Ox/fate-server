const Connection = require("../classes/connection");

class ConnectionHandler {
    constructor(server) {
        this.server = server;
        this.sockets = new Set();
        this.clients = new Set();
    }

    initializeSocket(connection, socket) {
        socket.on("end", () => {
            connection.status = "finishing";
            this.sockets.delete(socket);
            this.clients.delete(connection);
        });

        socket.on("error", () => {
            connection.status = "finishing";
            this.sockets.delete(socket);
            this.clients.delete(connection);
        });
    }

    addConnection(socket) {
        let connection = new Connection(socket);

        this.sockets.add(socket);
        this.clients.add(connection);

        console.log("Initial handshake from socket [§e" + connection.getAddress() + "§f:§e" + connection.getPort() + "§f] has connected as a new client.");

        setTimeout(() => {
            if (connection.status == "login") {
                connection.kick("Timeout");
                console.log("No response from socket [§c" + connection.getAddress() + "§f:§c" + connection.getPort() + "§f] kicked due to Timeout");
            }
        }, this.server.settings.timeout || 6000); // 6000ms default

        this.initializeSocket(connection, socket);
        this.handlePackets(connection);
    }

    handlePackets(connection) {
        connection.socket.on("data", (buffer) => {
            if (this.sockets.has(connection.socket) && connection.status != "finishing") {
                this.server.getPacketHandler().handle(connection, buffer);
            }
        });
    }
}

module.exports = ConnectionHandler;