const PlayerSpawnEvent = require("../events/PlayerMovementEvent");

function spawnPlayer (server, player, position) {
    for ( let p of server.getOnlinePlayers() ) {
        if (p != player) {
            p.sendPacket({
                type: "entity_spawn",
                entity_id: player.getEntityID(),
                entity_type: "player",
                entity_name: player.getUsername(),
                x: position.x,
                y: position.y,
                z: position.z
            });
        }
    }
}

function spawnOnlinePlayers (server, player) {
    for (let p of server.getOnlinePlayers()) {
        if (p != player) {
            player.sendPacket({
                type: "entity_spawn",
                entity_id: p.getEntityID(),
                entity_name: p.getUsername(),
                entity_type: "player",
                x: p.x,
                y: p.y,
                z: p.z
            });
        }
    }
}

module.exports = (server) => {
    server.on("player:join", async (event) => {
        let { player } = event;
        let x = 0;
        let y = 1;
        let z = 0;

        let playerEvent = new PlayerSpawnEvent(player, {x, y, z});
        await server.emit("player:spawn", playerEvent);

        if (!playerEvent.cancelled) {
            spawnPlayer(server, player, {x, y, z});
            spawnOnlinePlayers(server, player);
        }
    })
}