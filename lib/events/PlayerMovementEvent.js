const PlayerEvent = require("./PlayerEvent");

class PlayerMovementEvent extends PlayerEvent {

    constructor (player, to) {
        super(player);
        this.from = { x: player.x, y: player.y, z: player.z };
        this.to = to;
    }

    getDistance () {
        let x = (this.to.x > this.from.x ? this.to.x - this.from.x : this.from.x - this.to.x);
        let y = (this.to.y > this.from.y ? this.to.y - this.from.y : this.from.y - this.to.y);
        let z = (this.to.z > this.from.z ? this.to.z - this.from.z : this.from.z - this.to.z);

        return { x, y, z, total: x + y + z};
    }

    getFrom () {
        return this.from;
    }

    getTo () {
        return this.to;
    }
}

module.exports = PlayerMovementEvent;