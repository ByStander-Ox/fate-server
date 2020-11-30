const PlayerMovementEvent = require("../events/PlayerMovementEvent");

function rotatePlayer (server, player, rotation) {
    for ( let p of server.getOnlinePlayers() ) {
        if (p != player) {
            p.sendPacket({
                type: "entity_rotate",
                entity_id: player.getEntityID(),
                rotation
            });
        }
    }
}

module.exports = (server) => {
    server.on("player:packet", async (event) => {
        let { player, packet } = event;
        let { type, rotation } = packet

        if ( type == "rotation" ) {
            let event = new PlayerMovementEvent(player, rotation);
            await server.emit("player:rotate", event);

            if ( !event.isCancelled() ) {
                console.log("Player " + player.getUsername() + " rotating to " + rotation);
                rotatePlayer(server, player, rotation);
            }
        }
    })
}