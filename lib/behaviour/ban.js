module.exports = (server) => {
    server.commandHandler.registerCommand({
        name: "ban",
        description: "ban a player",
        executor: (sender, args) => {
            let username = args[0];
            if (!username) {
                sender.sendMessage("Specify a username");
            } else {
                let user = server.playerHandler.getByUsername(username);
                if (!user) {
                    sender.sendMessage("Player " + username + " is offline");
                } else {
                    user.ban(args[1] || "No reason provided");
                }
            }
        }
    });
}