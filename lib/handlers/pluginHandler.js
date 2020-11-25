const fs = require("fs");
const path = require("path");

class PluginHandler {
    constructor(server) {
        this.server = server;
        this.plugins = new Set();
    }

    async loadPlugin(dir) {
        let info = require(path.join(dir, "plugin.json"));
        let handler = require(path.join(dir, info.main));
        
        let { author, name, version, commands } = info;
        console.log("§aEnabling §fplugin §b" + name + " §fversion §e" + version + " §fby §d" + author + "§f.");

        let commandsKeys = Object.keys(commands || {});
        for (let key of commandsKeys) {
            this.server.commandHandler.registerCommand({...commands[key], name: key});
        }

        let plugin = new handler(this.server);
        await plugin.onEnable();
        console.log("Plugin §b" + name + "§f has been loaded §asucessfully§f.");
    }

    async loadDirectory(dir) {
        let directories = await fs.readdirSync(dir);
        console.log("Fetching on §e\"" + dir + "\"§f for plugins");
        directories.forEach((directory) => {
            let fullPath = path.join(dir, directory);

            if (fs.lstatSync(fullPath).isDirectory() )
                this.loadPlugin(fullPath);
        });
    }
}

module.exports = PluginHandler;