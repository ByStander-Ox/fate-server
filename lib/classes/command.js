class Command {
    constructor (obj) {
        let { name, aliases, description, executor} = obj;

        this.name = name;
        this.aliases = aliases || [];
        this.description = description;
        this.executor = executor;
    }

    isMatch (str) {
        str = str.toLowerCase();

        if (this.name.toLowerCase() == str) {
            return true;
        }

        for (let alias of this.aliases) {
            if (alias.toLowerCase() == str) {
                return true;
            }
        }

        return false;
    }

    handle (sender, args) {
        if (this.executor)
            this.executor(sender, args);
        else
            console.error("Command " + this.name + " doesn't contains an executor.");
    }
}

module.exports = Command;