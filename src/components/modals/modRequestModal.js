const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    name: "modRequestModal",
  },

  async execute(interaction, client) {
    const aproveChannel = client.channels.cache.get(config.aproveChannel);

    const member = await interaction.member;

    const embedMod = new EmbedBuilder()
      .setTitle(`Novo formulário - **Moderador** **|** Lotus UNIT`)
      .setColor("#4721ec")
      .setImage(config.formChannelData.modFormBanner)
      .setFooter(config.footerEmbeds)
      .setFields([
        {
          name: "**__Enviado por__**",
          value: `${interaction.member}\nUsername: ${interaction.user.username}\nID: ${interaction.user.id}`,
          inline: true,
        },
        {
          name: "**__Atuação__**",
          value: `${interaction.fields.getTextInputValue("experienceInfo")}`,
          inline: true,
        },
        {
          name: "**__Tempo de Experiência:__**",
          value: `${interaction.fields.getTextInputValue("experienceTime")}`,
          inline: true,
        },
        {
          name: "**__Servidores onde já atuou:__**",
          value: `${interaction.fields.getTextInputValue("experienceServer")}`,
          inline: true,
        },
        {
          name: "**__Recomendação:__**",
          value: `${interaction.fields.getTextInputValue(
            "serverRecomendation"
          )}`,
          inline: true,
        },
      ]);

    const row = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(`aprove-mod-request:${interaction.user.id}`)
        .setLabel("Aprovar")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`refuse-mod-request:${interaction.user.id}`)
        .setLabel("Recusar")
        .setStyle(ButtonStyle.Danger)
    );

    const message = await aproveChannel.send({
      embeds: [embedMod],
      components: [row],
    });

    const modUnitModel = require("../../models/modunit");
    const newUnitDoc = new modUnitModel({
      userId: interaction.user.id,
      pending: true,
    });

    await newUnitDoc.save();

    await message.startThread({
      name: `Moderador: ${interaction.user.username}`,
    });

    await interaction.reply({
      content:
        `<a:1_everythingisstable:1042548343852777523>` +
        "Sua inscrição foi enviada e será analisada cuidadosamente. Agradecemos pelo seu interesse e esperamos tê-lo em breve como membro da nossa associação Lotus UNIT.",
      ephemeral: true,
    });
    setTimeout(async () => {
      await member.roles.remove(config.unverifiedID);
      await member.roles.add(config.awaitID);
    }, 15000);
  },
};
