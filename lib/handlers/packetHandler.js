class PacketHandler {
    constructor(server) {
        this.server = server;
        this.initialize();
    }

    async handle(connection, buffer) {
        let packet = JSON.parse(buffer.toString());
        let pipe = this.pipelines[0];

        // [ ...this.pipelines ] es un metodo para crear un array a partir de otra
        // en este caso necesito enviar una copia y no la referencia

        // El pipe es async por que hay pipelines que tardan en procesar
        // Por ejemplo, pipelines que hagan una peticion web
        // en caso de requerir autenticación, o pipelines que hagan
        // una consulta a la base de datos.
        await pipe.handle(connection, packet, [...this.pipelines]);

        if (connection.player) {
            this.server.emit("player:packet", { connection, player: connection.player, packet });
        } else {
            this.server.emit("connection:packet", { connection, packet });
        }
    }

    initialize() {
        this.pipelines = [];

        let PingPipeline = require("../pipe/ping.pipe");
        let LoginPipeline = require("../pipe/login.pipe")

        this.pipelines.push(new PingPipeline(this.server));
        this.pipelines.push(new LoginPipeline(this.server));
    }
}

module.exports = PacketHandler;