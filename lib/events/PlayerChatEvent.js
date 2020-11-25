const Player = require("../classes/player");
const PlayerEvent = require("./PlayerEvent");

class PlayerChatEvent extends PlayerEvent {

    constructor (player, message) {
        super(player);
        this.message = message;
        this.format = "<color=\"#2277bb\">[Chat]</color> <color=\"#ffffff\">{player}</color>: <color=\"#dddddd\">{message}</color>";
    }

    getMessage () {
        return this.message;
    }

    getFormat () {
        return this.format;
    }

    getFormatedMessage () {
        return this.format.replace("{player}", this.player.getUsername()).replace("{message}", this.message);
    }

    setMessage (message) {
        this.message = message;
    }

    setFormat (format) {
        this.format = format;
    }

}

module.exports = PlayerChatEvent;