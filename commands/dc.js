const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('dc')
    .setDescription('Disconnect the bot!'),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guildId);

    console.log(connection);
    connection.destroy();

    await interaction.reply({ content: 'Ciao bye bye!', ephemeral: true });
  },
};