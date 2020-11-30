class PlayerSpawnEvent extends PlayerEvent {
    constructor (player, position) {
        super(player);
        this.position = position;
    }
}

module.exports = PlayerSpawnEvent;