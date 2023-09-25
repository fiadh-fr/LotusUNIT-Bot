const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { EmbedBuilder, parseWebhookURL } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    name: "aprove-mod-request",
  },

  async execute(interaction, client) {
    const member = await interaction.guild.members
      .fetch(interaction.customId.split(":")[1])
      .catch(() => null);

    if (member) {
      await member.roles.add(config.modID);
      await member.roles.remove(config.awaitID);
    } else
      return interaction[
        interaction.replied || interaction.deferred ? "followUp" : "reply"
      ]({
        content:
        `<a:1_laydowntorest:1042548347715727390>` + " **|** **Erro 500:** Membro não encontrado. Não foi possível atribuir-lhe o cargo.",
        ephemeral: true,
      });

    await interaction.deferReply({ ephemeral: true });

    const embed = EmbedBuilder.from(interaction.message.embeds[0]);

    const content = new EmbedBuilder()
      .setTitle("Aviso referente a inscrição - **Lotus UNIT**")
      .setImage(config.formChannelData.congratsFormBanner)
      .setColor(0x4721ec)
      .setFooter(config.footerEmbeds)
      .setDescription(
        `Olá ${member},\n\n` +
          "Agradecemos pelo seu interesse na Black Lotus. Recebemos um grande número de inscrições e, após uma ***revisão cuidadosa***, **temos o prazer de informar que você foi selecionado** para avançar para a próxima etapa como **Moderador** em nossa associação.\n" +
          `Parabéns por essa conquista, e estamos empolgados em tê-lo a bordo. Se tiver alguma dúvida ou precisar de informações adicionais, não hesite em entrar em contato. Sugerimos que você inclua a referência "Lotus UNIT" em seu perfil a partir de agora.\n\n` +
          "Mais uma vez, agradecemos pelo seu tempo e interesse. Desejamos a você sucesso em suas futuras empreitadas!\n\n" +
          "**Atenciosamente,** \nA equipe Black Lotus \n\n"
      );
    const central = new ButtonBuilder()
      .setLabel(" | Ir para Central")
      .setStyle(ButtonStyle.Link)
      .setEmoji(config.formChannelData.siteEmoji)
      .setURL(
        "https://discord.com/channels/896047806454837278/1094449076533198859"
      );

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

    const row = new ActionRowBuilder().addComponents(central, faq, tos);

    if (member) {
      await member
        .send({
          embeds: [content],
          components: [row],
        })
        .catch(async () => {
          await interaction.reply({
            content:
            `<a:1_laydowntorest:1042548347715727390>` + " **|** **Erro 404:** O contato com o membro não pôde ser estabelecido.",
            ephemeral: true,
          });
        });
    }

    embed
      .setColor("#00910f")
      .setTitle(`*Inscrição aprovada* - **Moderador**`)
      .addFields({
        name: "Aprovado por",
        value: `${interaction.user} (${interaction.user.id})`,
        inline: true,
      });
    await interaction.message.edit({ embeds: [embed], components: [] });

    await interaction.message.thread.setArchived(true);

    await interaction.editReply({
      content:
        `<a:1_everythingisstable:1042548343852777523>` +
        " **|** Inscrição aprovada: **Moderador** **|** *O usuário será notificado e receberá o cargo de* ***Moderador***.",
      ephemeral: true,
    });

    const webhook = parseWebhookURL(process.env.OFFTOPIC_WEBHOOK);
    await interaction.client
      .fetchWebhook(webhook.id, webhook.token)
      .then(async (webhook) => {
        await webhook.send({
          content: `<a:1_verified:1055293708825808947> **|** O membro ${member} teve sua inscrição *analisada e aprovada*, e agora faz oficialmente parte da **Lotus UNIT** na categoria ***Moderador***. Seja muito bem-vindo!`,
          username: interaction.guild.name,
          avatarURL: interaction.guild.iconURL(),
          allowedMentions: {
            users: [],
          },
        });
      });
  },
};
