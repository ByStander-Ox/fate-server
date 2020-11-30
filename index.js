import path from "path";
import fate from "./lib";
import config from "./config.json";

config.plugins = path.join(__dirname, "plugins");

const server = new fate.Server(config);

console.log("Loading server...");

server.listen(config.port, config.host);