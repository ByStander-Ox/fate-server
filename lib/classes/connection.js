class Connection {
   constructor (socket) {
       this.socket = socket;
       this.connected = true;
       this.status = "login";
    }

    getAddress() {
        return this.socket.remoteAddress;
    }

    getPort() {
        return this.socket.remotePort;
    }

    kick(reason) {
        this.status = "finishing";

        this.sendPacket({
            type: "kick",
            reason
        });

        setTimeout(() => {
            this.terminate();
        }, 4000); // 4000ms
    }

    sendPacket(packet) {
        if (this.connected) {
          this.socket.write(JSON.stringify(packet)); 
        }
    }

    terminate() {
        if (this.connected) {
            this.socket.end();
        }
    }
}

module.exports = Connection;