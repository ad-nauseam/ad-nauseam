module.exports = (client, interaction) => {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 3,
            data: {
                content: 'Pong!',
                flags: 2**6
            }
        }
    })
}