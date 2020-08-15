module.exports = {
    name: "sum",
    category: "clac",
    run: async(client, message, args)=> {
        args = args.map(Number);
        const sum = function (args) {
            let sum = 0;
            args.forEach(function (elm) {
                sum += elm;
            });
            return sum;
        };
        await message.reply(sum(args));
    }
}