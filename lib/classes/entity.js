class Entity {
    constructor (id) {
        this.entityID = id;

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.health = 0;
    }


    getEntityID () {
        return this.entityID;
    }

    getHealth () {
        return this.health;
    }

    isAlive () {
        return this.health > 0;
    }
    
    kill () {
        this.health = 0;
    }

    setHealth (health) {
        this.health = health;
    }
}

module.exports = Entity;