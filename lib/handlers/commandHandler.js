const captainjs = require("captainjs");
const Command = require("../classes/command");

class CommandHandler {
    constructor () {
        this.commander = new captainjs.Commander();
        this.commandsRegistered = [];

        this.commander.onUnknownCommand(() => {
            console.error("Comando desconocido.");
        });
    }

    fetchCommand (sender, cmdName, args) {
        let command = null;
        for (let registered of this.commandsRegistered) {
            if (registered.isMatch(cmdName)) {
                command = registered;
            }
        }

        console.log("§e" + sender.getUsername() + " §rhas issued command §e" + cmdName + "§r. " + ( command ? "§a[OK" : "§c[NA" ) + "]");
        this.runCommand(sender, command, args);
    }

    getCommand (commandName) {
        for (let command of this.commandsRegistered) {
            if (command.name.toLowerCase() == commandName.toLowerCase()) {
                return command;
            }
        }
    }

    registerCommand (commandInfo) {
        let command = new Command(commandInfo);
        
        this.commandsRegistered.push(command);
        this.commander.registerCommand(command.name, (args) => {
            command.handle(null, args);
        });

        for (let alias of command.aliases) {
            this.commander.registerCommand(alias, (args) => {
                command.handle(null, args);
            });    
        }
    }

    runCommand (sender, command, args) {
        if (command == null) {
            sender.sendMessage("<color=\"red\">Comando desconocido.</color>");
        } else {
            command.handle(sender, args);
        }
    }

    fetchForConsoleCommand () {
        this.commander.fetch();
    }
}

module.exports = CommandHandler;