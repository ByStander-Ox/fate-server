class Pipeline {
    constructor(server) {
        this.server = server;
    }
    
    async handle (connection, packet, pipelines) {
        pipelines.shift();

        await this.onPacketReceive(connection, packet);
        if (pipelines.length == 0) {
            return { connection, packet };
        } else {
            return await pipelines[0].handle(connection, packet, pipelines);
        }
    }

    async onPacketReceive (connection, packet) {
        /* Override method */
    }

}

module.exports = Pipeline;