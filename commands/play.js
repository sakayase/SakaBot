const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, AudioPlayer } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the vocal channel in which you\'re in'),
  async execute(interaction, client) {
    await interaction.reply({ content: 'Joining ...', ephemeral: true });

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

    // Subscribe the connection to the audio player (will play audio on the voice connection)
    const subscription = connection.subscribe(audioPlayer);

    // subscription could be undefined if the connection is destroyed!
    if (subscription) {
    // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
      setTimeout(() => subscription.unsubscribe(), 5_000);
    }


  /* player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
    console.log('Audio player is in the Playing state!');
  }); */
  },
};