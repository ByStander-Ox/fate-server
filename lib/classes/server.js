const ConnectionHandler = require("../handlers/connectionHandler");
const CommandHandler = require("../handlers/commandHandler");
const PacketHandler = require("../handlers/packetHandler");
const PlayerHandler = require("../handlers/playerHandler");
const PluginHandler = require("../handlers/pluginHandler");

const ChatBehaviour = require("../behaviour/chat");
const BanBehaviour = require("../behaviour/ban");

const Listener = require("../networking/listener");

const captain = require("captainjs");
const mongoose = require("mongoose");

console = new captain.Console({"use_colors": true});

class Server {
    constructor(settings) {
        this.settings = settings;
        this.connectionHandler = new ConnectionHandler(this);
        this.commandHandler = new CommandHandler(this);
        this.packetHandler = new PacketHandler(this);
        this.playerHandler = new PlayerHandler(this);
        this.pluginHandler = new PluginHandler(this);
        this.events = new Map();

        mongoose.connect(settings.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("Database connected §asuccefully§r.");
        }).catch((e) => {
            console.error("§cError §rconnecting to Database:\n" + e);
        });

        ChatBehaviour(this);
        BanBehaviour(this);
    }

    async emit(eventName, event) {
        let handlers = this.events.get(eventName.toLowerCase()) || [];
        for (let handler of handlers) {
            await handler(event);
        }
    }

    broadcast (message) {
        for (let player of this.playerHandler.getOnlinePlayers()) {
            player.sendPacket({
                type: "chat",
                message
            });
        }
    }

    getConnectionHandler() {
        return this.connectionHandler;
    }

    getOnlinePlayers() {
        return this.playerHandler.getOnlinePlayers();
    }

    getMaxPlayers() {
        return this.settings.maxPlayers || 12;
    }

    getMotd() {
        return this.settings.motd || "Another Fate server";
    }

    getPacketHandler() {
        return this.packetHandler;
    }

    getPlayerHandler() {
        return this.playerHandler;
    }

    getPluginHandler() {
        return this.pluginHandler;
    }

    getVersion() {
        return "1.0";
    }

    async listen(port, hostname) {
        this.listener = await Listener(port, hostname, this.connectionHandler);
        if (this.settings.plugins) {
            this.pluginHandler.loadDirectory(this.settings.plugins);
        }
        console.log("Server listening on port §b" + port);
        this.commandHandler.fetchForConsoleCommand();
    }

    on(eventName, listener) {
        let handlers = this.events.get(eventName.toLowerCase()) || [];
        handlers.push(listener);
        this.events.set(eventName, handlers);
    }
}

module.exports = Server;