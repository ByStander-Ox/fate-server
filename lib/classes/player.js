const PlayerModel = require("../models/player.model");

class Player {
    constructor (connection, username, uuid) {
        this.connection = connection;
        this.kicked = false;
        this.kickReason = "";
        this.socket = connection.socket;
        this.username = username;
        this.uuid = uuid;
        this.first_join = false;
    }

    async fetchData () {
        this.data = await PlayerModel.findOne({uuid: this.uuid});
    }

    async registerData () {
        this.data = new PlayerModel({uuid: this.uuid});
        await this.data.save();
    }

    async saveData () {
        await this.data.save();
    }

    ban (reason, time) {
        this.data.is_banned = true;
        this.data.ban_reason = reason;
        this.data.ban_expiry = time;
        this.data.banned_at = new Date(Date.now())

        if (this.connection.connected) {
            this.kick("You has been banned: " + reason);
        }

        this.saveData();
    }

    getBanReason () {
        return this.data.ban_reason;
    }

    getConnection () {
        return this.connection;
    }

    getSocket () {
        return this.socket;
    }

    getUsername () {
        return this.username;
    }

    getUUID () {
        return this.uuid;
    }

    isBanned() {
        if (this.data.is_banned && this.data.ban_expiry == null) {
            return true;
        } else if (this.data.is_banned) {
            if (new Date(Date.now > this.data.ban_expiry)) {
                this.data.is_banned = false;
                this.data.save();
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    isFirstJoin() {
        return this.first_join;
    }

    isOnline() {
        return this.connection.connected;
    }

    kick(reason) {
        this.kicked = true;
        this.kickReason = reason;
        this.connection.kick(reason);
    }

    sendPacket(packet) {
        this.connection.sendPacket(packet);
    }

    sendMessage (message) {
        this.sendPacket({
            type: "chat",
            message
        });
    }
}

module.exports = Player;