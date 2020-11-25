const net = require("net");

module.exports = (port, hostname, handler) => {
    return new Promise((resolve) => {
        let server = net.createServer();

        server.on("connection", (socket) => {
            handler.addConnection(socket);
        });

        server.on("error", (err) => {
            console.error(err);
        });

        server.on("listening", () => {
            resolve(server);
        })

        server.listen(port, hostname);
    })
}