const Pipeline = require("../classes/pipeline.js");
const Player = require("../classes/player");

let p = 0;

class LoginPipeline extends Pipeline {

    constructor (server) {
        super(server);
    }    

    async onPacketReceive (connection, packet) {
        let { type, token } = packet;
        if (type == "login" && connection.status == "login") {
            connection.status = "play";

            p++;
            let name = "FateUser_" + p;
            
            let player = new Player(connection, name, name);
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
                    username: name,
                    uuid: name
                })
            } 
        }
    }

}

module.exports = LoginPipeline;