const FateJS = require("../../lib");

class Main extends FateJS.Plugin {
    constructor(server) {
        super(server);
        this.addListener("player:chat", (event) => {
            console.log(event.getMessage());
            console.log(event.getPlayer().getUsername());
        });
    }

    onEnable() {
        this.setCommandExecutor("test", (sender, args) => {
            sender.sendMessage("hola uwu");
        });
    }
}

module.exports = Main;