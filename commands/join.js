const {SlashCommandBuilder} = require('@discordjs/builders');
const {
  joinVoiceChannel,
  VoiceConnectionStatus,
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('join')
      .setDescription('Join the vocal channel in which you\'re in'),
  async execute(interaction, client) {
    await interaction.reply({content: 'Joining ...', ephemeral: true});

    // console.log(client)
    const channel = await client.channels.fetch(interaction.channelId);
    // console.log(channel)

    const connection = joinVoiceChannel({
      // channelId: channel.id,
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    // console.log(connection);

    connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
      console.log('Connection is in the Ready state!');
    });
  },
};
