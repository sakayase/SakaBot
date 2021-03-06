const {SlashCommandBuilder} = require('@discordjs/builders');
const {getVoiceConnection} = require('@discordjs/voice');


module.exports = {
  data: new SlashCommandBuilder()
      .setName('dc')
      .setDescription('Disconnect the bot!'),
  async execute(interaction, player) {
    const connection = getVoiceConnection(interaction.guildId);
    connection.destroy();

    await interaction.reply({content: 'Ciao bye bye!', ephemeral: true});
  },
};
