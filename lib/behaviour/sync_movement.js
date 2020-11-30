const PlayerMovementEvent = require("../events/PlayerMovementEvent");

function movePlayer (server, player, position) {

    player.x = position.x;
    player.y = position.y;
    player.z = position.z;

    for ( let p of server.getOnlinePlayers() ) {
        if (p != player) {
            p.sendPacket({
                type: "entity_move",
                entity_id: player.getEntityID(),
                x: position.x,
                y: position.y,
                z: position.z
            });
        }
    }
}

module.exports = (server) => {
    server.on("player:packet", async (event) => {
        let { player, packet } = event;
        let { type, x, y, z } = packet

        if ( type == "movement" && ( player.x != x || player.y != y || player.z != z ) ) {
            let event = new PlayerMovementEvent(player, {x, y, z});
            await server.emit("player:move", event);

            if ( !event.isCancelled() ) {
                console.log("Player " + player.getUsername() + " moving to " + x + " " + y + " " + z);
                movePlayer(server, player, {x, y, z});
            }
        }
    })
}