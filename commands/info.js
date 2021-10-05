const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('info')
      .setDescription('Gives info'),
  async execute(interaction, client) {
    const channel = await client.channels.fetch(interaction.channelId);
    console.log(channel.type);
    console.log(interaction);
    // await interaction.reply({content: 'Pong!', ephemeral: true});
  },
};
