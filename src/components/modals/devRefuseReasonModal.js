const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    name: "devRefuseReasonModal",
  },
  async execute(interaction, client) {
    const embedDev = EmbedBuilder.from(interaction.message.embeds[0]);

    const reasonInput = interaction.fields.getTextInputValue("reason");

    embedDev
      .setColor("#8c0000")
      .setTitle(
        `*Inscrição Recusada* - **Desenvolvedor**`
      )
      .addFields([
        {
          name: "**__Recusado pelo motivo__**",
          value: `${reasonInput || "O motivo não foi definido."}`,
          inline: true,
        },
        {
          name: "Recusado por",
          value: `${interaction.user} (${interaction.user.id})`,
          inline: true,
        },
      ]);

    await interaction.message.edit({ embeds: [embedDev], components: [] });

    await interaction.message.thread.setArchived(true);

    const member = await interaction.guild.members
      .fetch(interaction.customId.split(":")[1])
      .catch(() => null);
    const content = new EmbedBuilder()
      .setTitle("Aviso referente a inscrição - **Lotus UNIT**")
      .setImage(config.formChannelData.welcomeEmbedBanner)
      .setColor(0x4721ec)
      .setFooter(config.footerEmbeds)
      .setDescription(
        `Olá ${member},\n\n` +
          "Agradecemos pelo seu interesse na Black Lotus. Recebemos um grande número de inscrições e, após uma ***revisão cuidadosa***, lamentamos informar que, desta vez, não poderemos convidá-lo para a próxima etapa em nossa associação.\n" +
          "No entanto, encorajamos você a continuar nos acompanhando e a considerar se candidatar novamente no futuro.\n\n" +
          "Mais uma vez, agradecemos pelo seu tempo e interesse. Desejamos a você sucesso em suas futuras empreitadas! Abaixo, você pode ler detalhadamente os motivos da recusa.\n\n" +
          "**__Motivo:__** " + `${reasonInput || "O motivo não foi definido."}.\n\n` +
          "**Atenciosamente,** \n*A equipe Black Lotus* \n\n"
      );
    const website = new ButtonBuilder()
      .setLabel("Site")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.formChannelData.siteEmoji)
      .setURL("https://theblacklotus.fr/");

    const faq = new ButtonBuilder()
      .setLabel("FAQ")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.formChannelData.faqEmoji)
      .setURL("https://theblacklotus.fr/faq.html");

    const tos = new ButtonBuilder()
      .setLabel("TOS")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.formChannelData.tosEmoji)
      .setURL("https://theblacklotus.fr/terms-of-service.html");

    const serversMember = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.formChannelData.partnerEmoji)
      .setURL("https://theblacklotus.fr/servidores-membros.html");

    const row = new ActionRowBuilder().addComponents(
      website,
      faq,
      tos,
      serversMember
    );

    if (member) {
      await member
        .send({
          embeds: [content],
          components: [row],
        })
        .catch(async () => {
          await interaction.reply({
            content:
            `<a:1_laydowntorest:1042548347715727390>` +
              " - **Erro 404:** O contacto com o membro não pôde ser estabelecido.",
            ephemeral: true,
          });
        });
    }

    await interaction[
      interaction.replied || interaction.deferred ? "followUp" : "reply"
    ]({
      content: `<a:1_laydowntorest:1042548347715727390>` + "Inscrição recusada **|** *O usuário será notificado e removido do servidor.*",
      ephemeral: true,
    });
    await member.kick()
  },
};
