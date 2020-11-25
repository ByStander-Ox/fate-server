const path = require("path");
const fate = require("./lib");
const config = require("./config.json");

config.plugins = path.join(__dirname, "plugins");

const server = new fate.Server(config);

console.log("Loading server...");

server.listen(config.port, config.host);