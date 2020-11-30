const PlayerEvent = require("./PlayerEvent");

class PlayerRotationEvent extends PlayerEvent {
    constructor (player, rotation) {
        super(player);
        this.rotation = rotation;
    }
}

module.exports = PlayerRotationEvent;