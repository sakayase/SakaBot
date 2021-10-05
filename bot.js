const {Client, Intents, Collection} = require('discord.js');
const fs = require('fs');
const {token} = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES]});

client.commands = new Collection();

// Parse the command foldfer and extract a list of the names of the files.
const commandFilesArray = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

// console.log(commandFilesArray);
for (const file of commandFilesArray) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // console.log(command);
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// console.log(client);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  // console.log(command);

  if (!command) return;

  try {
    // console.log(interaction)
    await command.execute(interaction, client);
  } catch (err) {
    console.error(err);
    await interaction
        .reply(
            {content: 'There was an error while executing this command!',
              ephemeral: true});
  }
});

client.login(token);
