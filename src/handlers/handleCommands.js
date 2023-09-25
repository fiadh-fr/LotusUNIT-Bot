const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const path = require("path");
const config = require("../config.js");

module.exports = async (client) => {
  commandArray = [];
  fs.readdirSync(path.join(__dirname, "..", "commands"))
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const command = require(`../commands/${file}`);
      if (!command.active) return;
      client.commands.set(command.data.name, command);
      commandArray.push(command.data.toJSON());
      console.log(
        `Command: ${command.data.name} has been passed through the handler`
      );
    });
  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
  try {
    console.log("Restarting commands ... OK!");

    await rest.put(
      Routes.applicationGuildCommands(config.lotusUnit, config.guild),
      {
        body: commandArray,
      }
    );
    console.log("Commands restarted!");
  } catch (error) {
    console.error(error);
  }
};
