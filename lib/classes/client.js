const net = require("net");

class Client {
    constructor() {
        this.socket = new net.Socket();
        this.auxEvents = new Set();

        this.socket.on("data", (buffer) => {
            let packet = JSON.parse(buffer.toString());
            for (let ev of this.auxEvents) {
                ev(packet);
            }
        })
    }

    on(event, handler) {
        this.socket.on(event, handler)
    }

    connect(host, port) {
        this.host = host;
        this.port = port;

        console.log("Connecting to " + host + ":" + port);
        this.socket.connect(port, host, () => {
            console.log("Connected! Handshaking with the server...");
        });
    }

    disconnect() {
        this.socket.end();
    }

    login(token) {
        this.sendPacket({
            type: "login",
            token
        });

        return this.asyncWaitFor("login");
    }

    ping() {
        this.sendPacket({
            type: "ping",
            hostname: this.host
        });

        return this.asyncWaitFor("ping");
    }

    sendPacket(packet) {
        this.socket.write(JSON.stringify(packet));
    }

    waitFor(type, handler) {
        let auxHandler = (packet) => {
            if (packet.type == type) {
                handler(packet);
                this.auxEvents.delete(auxHandler);
            }
        }

        this.auxEvents.add(auxHandler);
    }

    asyncWaitFor(type) {
        return new Promise((resolve) => {
            this.waitFor(type, (packet) => {
                resolve(packet);
            });
        })
    }
}

module.exports = Client;