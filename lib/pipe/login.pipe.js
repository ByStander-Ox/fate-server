const Pipeline = require("../classes/pipeline.js");
const Player = require("../classes/player");

class LoginPipeline extends Pipeline {

    constructor (server) {
        super(server);
    }    

    async onPacketReceive (connection, packet) {
        let { type, token } = packet;
        if (type == "login" && connection.status == "login") {
            connection.status = "play";
            
            let player = new Player(connection, "sammwy", "uwux2");
            await player.fetchData();

            if (player.data == null) {
                player.first_join = true;
                await player.registerData();
            }

            if (player.isBanned()) {
                player.kick("You are banned: " + player.getBanReason());
            } else {
                this.server.getPlayerHandler().addPlayer(player);
                connection.player = player;

                connection.sendPacket({
                    type: "login",
                    username: "sammwy",
                    uuid: "uwu"
                })
            } 
        }
    }

}

module.exports = LoginPipeline;