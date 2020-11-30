class PacketHandler {
    constructor(server) {
        this.server = server;
        this.initialize();
    }

    async handle(connection, buffer) {
        let packet = JSON.parse(buffer.toString());
        let pipe = this.pipelines[0];
        
        await pipe.handle(connection, packet, [...this.pipelines]);

        if (connection.player) {
            this.server.emit("player:packet", { connection, player: connection.player, packet });
        } else {
            this.server.emit("connection:packet", { connection, packet });
        }
    }

    initialize() {
        this.pipelines = [];

        let PingPipeline = require("../pipe/ping.pipe");
        let LoginPipeline = require("../pipe/login.pipe")

        this.pipelines.push(new PingPipeline(this.server));
        this.pipelines.push(new LoginPipeline(this.server));
    }
}

module.exports = PacketHandler;