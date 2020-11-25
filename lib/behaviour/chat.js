const PlayerChatEvent = require("../events/PlayerChatEvent");

module.exports = (server) => {
    server.on("player:packet", async (event) => {
        let { player, packet } = event;

        if (packet.type == "chat") {
            let { message } = packet;
            if (message.startsWith("/")) {
                let args = message.replace("/", "").split(" ");
                let cmdName = args[0].toLowerCase();
                args.shift();

                server.commandHandler.fetchCommand(player, cmdName, args);
            } else {
                let event = new PlayerChatEvent(player, packet.message);
                await server.emit("player:chat", event);
                if (!event.isCancelled()) {
                    server.broadcast(event.getFormatedMessage());
                    console.log("§9[Chat] §f" + player.getUsername() + ": §7" + event.getMessage());
                }
            }
        }
    });
}