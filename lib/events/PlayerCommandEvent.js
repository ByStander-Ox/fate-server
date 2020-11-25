const PlayerEvent = require("./PlayerEvent");

class PlayerCommandEvent extends PlayerEvent {

    constructor (player, command, args) {
        super(player);
        this.command = command;
        this.args = args;
    }

    getCommand () {
        return this.command;
    }

    getArgs () {
        return this.args;
    }

    getPlayer () {
        return this.player;
    }

}

module.exports = PlayerCommandEvent;