class PlayerEvent {
    constructor (player) {
        this.player = player;
        this.cancelled = false;
    }

    getPlayer () {
        return this.player;
    }

    isCancelled () {
        return this.cancelled;
    }

    setCancelled (result) {
        this.cancelled = result;
    }
}

module.exports = PlayerEvent;