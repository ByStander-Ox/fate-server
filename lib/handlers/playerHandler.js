class PlayerHandler {
    constructor (server) {
        this.server = server;
        this.players = new Set();
    }

    addPlayer(player) {
        this.players.add(player);
        this.server.emit("player:join", { player });
        console.log("Player §d" + player.getUsername() + " §f[§e" + player.getConnection().getAddress() + ":" + player.getConnection().getPort() + "§f] has connected.");
        let socket = player.connection.socket;
        socket.on("end", () => {
            if (player.kicked) {
                console.log("Player §b" + player.getUsername() + " §fhas been kicked: §c" + player.kickReason);
            } else {
                console.log("Player §b" + player.getUsername() + " §fhas §cdisconnected");
            }

            this.removePlayer(player);
        });

        socket.on("error", (e) => {
            console.log("Player §e" + player.getUsername() + " §elost connection: §4" + e);
            player.exception = e;
            this.removePlayer(player);
        })
    }

    getByUsername (username) {
        for (let p of this.players) {
            if (p.getUsername().toLowerCase() == username.toLowerCase()) {
                return p;
            }
        }

        return null;
    }

    getByUUID (uuid) {
        for (let p of this.players) {
            if (p.getUUID().toLowerCase() == uuid.toLowerCase()) {
                return p;
            }
        }

        return null;
    }

    getOnlinePlayers() {
        return this.players;
    }

    removePlayer(player) {
        this.server.emit("player:leave", { player, kicked: player.kicked, kickReason: player.kickReason, error: player.exception });
        this.players.delete(player);
    }
}

module.exports = PlayerHandler;