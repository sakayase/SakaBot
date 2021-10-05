const {SlashCommandBuilder} = require('@discordjs/builders');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('play')
      .setDescription('Play a song !'),
  async execute(interaction, client) {
    await interaction.reply({content: 'Joining ...', ephemeral: true});

    const channel = await client.channels.fetch(interaction.channelId);

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    connection.on('stateChange', (oldState, newState) => {
      console.log(`Connection transitioned from ${oldState.status}
       to ${newState.status}`);
    });

    player.on('stateChange', (oldState, newState) => {
      console.log(`Audio player transitioned from ${oldState.status}
       to ${newState.status}`);
    });

    player.on('error', (error) => {
      console.error('Error:',
          error.message,
          'with track',
          error.resource.metadata.title);
    });

    // Subscribe the connection to the audio player (will play audio on
    // the voice connection)
    const resource = createAudioResource('./audio/01 Le Piège.mp3');
    player.play(resource);
    const subscription = connection.subscribe(player);

    /* console.log('resource : ******************************');
    console.log(resource);
    console.log('player : *****************************');
    console.log(player);
    console.log('subscription : *****************************');
    console.log(subscription);*/

    // subscription could be undefined if the connection is destroyed!
    if (!subscription) {
    // Unsubscribe after 5 seconds (stop playing audio on the voice connection)
      setTimeout(() => subscription.unsubscribe(), 5_000);
    }


  /* player.on(AudioPlayerStatus.Playing, (oldState, newState) => {
    console.log('Audio player is in the Playing state!');
  }); */
  },
};
