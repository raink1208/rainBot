module.exports = {
    name: "chord",
    run: async(client, message, args) => {
        let chord = [];
        while (chord.length <= 3) {
            chord.push(get(chord[chord.length - 1]))
        }
        await message.channel.send(chord.join(""))
    }
}

function get(last) {
    let list = ["A","B","C","D","E","F","G"];
    list.filter(function (elm, index) {
        if (elm === last) list.splice(index,1)
    });
    return list[Math.floor(Math.random() * list.length)]
}