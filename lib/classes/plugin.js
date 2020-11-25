class Plugin {
    constructor(server) {
        this.server = server;
    }

    getCommand (name) {
        return this.server.commandHandler.getCommand(name);
    }

    getServer() {
        return this.server;
    }

    setCommandExecutor (name, handler) {
        this.getCommand(name).executor = handler;
    }

    addListener (eventName, listener) {
        this.server.on(eventName, (event) => {
            listener(event);
        });
    }

    async onEnable() {
        console.error("§cPlugin doesn't contains a valid onEnable function.");
    }
}

module.exports = Plugin;