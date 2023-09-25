const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    name: "devRequestModal",
  },

  async execute(interaction, client) {
    const aproveChannel = client.channels.cache.get(config.aproveChannel);

    const member = await interaction.member;

    const embedDev = new EmbedBuilder()
      .setTitle(`Novo formulário - **Desenvolvedor** **|** Lotus UNIT`)
      .setColor("#4721ec")
      .setImage(config.formChannelData.developerFormBanner)
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
          name: "**__Portfólio__**",
          value: `${interaction.fields.getTextInputValue("portfolioLink")}`,
          inline: true,
        },
        {
          name: "**__Servidor:__**",
          value: `${
            interaction.fields.getTextInputValue("serverInvite") || "Não tem"
          }`,
          inline: true,
        },
      ]);

    const row = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(`aprove-dev-request:${interaction.user.id}`)
        .setLabel("Aprovar")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`refuse-dev-request:${interaction.user.id}`)
        .setLabel("Recusar")
        .setStyle(ButtonStyle.Danger)
    );

    const message = await aproveChannel.send({
      embeds: [embedDev],
      components: [row],
    });

    const devUnitModel = require("../../models/devunit");
    const newUnitDoc = new devUnitModel({
      userId: interaction.user.id,
      pending: true,
    });

    await newUnitDoc.save();

    await message.startThread({
      name: `Desenvolvedor: ${interaction.user.username}`,
    });

    await interaction.reply({
      content:`<a:1_everythingisstable:1042548343852777523>` + "Sua inscrição foi enviada e será analisada cuidadosamente. Agradecemos pelo seu interesse e esperamos tê-lo em breve como membro da nossa associação Lotus UNIT.",
      ephemeral: true,
    });
    setTimeout(async () => {
      await member.roles.remove(config.unverifiedID);
      await member.roles.add(config.awaitID);
      console.log(error)
    }, 15000);
  },
};
