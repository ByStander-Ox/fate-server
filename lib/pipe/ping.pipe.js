const Pipeline = require("../classes/pipeline.js");

class PingPipeline extends Pipeline {
    constructor (server) {
        super(server);
    }    

    async onPacketReceive (connection, packet) {
        let { type } = packet;
        if (type == "ping" && connection.status == "login") {
            connection.sendPacket({
                type: "ping",
                motd: this.server.getMotd(),
                max_players: this.server.getMaxPlayers(),
                online_players: this.server.getOnlinePlayers().size,
                version: this.server.getVersion()
            });
        }
    }

}

module.exports = PingPipeline;