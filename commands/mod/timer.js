module.exports = {
    name: "timer",
    category: "moderation",
    run: (client, message, args) => {
        let tmp = [];
        let time = 0;
        args[0].split("").forEach(v => {
            console.log(tmp);
            switch (v) {
                case "秒":
                case "s":
                    time += Number(tmp.join(""));
                    tmp = [];
                    break;
                case "分":
                case "m":
                    time += Number(tmp.join("")) * 60;
                    tmp = [];
                    break;
                case "h":
                    time += Number(tmp.join("")) * 3600;
                    tmp = [];
                    break;
                default:
                    tmp.push(Number(v))
            }
        });

        function sendMessage() {
            message.channel.send(`${args[0]} カウント終了`);
        }

        setTimeout(sendMessage,time*1000);
    }
};
