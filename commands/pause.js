const {SlashCommandBuilder} = require('@discordjs/builders');
const {getVoiceConnection} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('pause')
      .setDescription('Pause the song'),
  async execute(interaction, player) {
    const connection = getVoiceConnection(interaction.guildId);
    console.log(connection);
    console.log(player);
    player.pause();

    await interaction.reply({content: 'Pong!', ephemeral: true});
  },
};
