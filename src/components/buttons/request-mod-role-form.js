const {
  ButtonBuilder,
  ModalBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonStyle,
} = require("discord.js");
const config = require("../../config");

module.exports = {
  data: {
    name: "request-mod-role-form",
  },

  async execute(interaction, client) {
    const modConfirmationEmbed = new EmbedBuilder()
      .setTitle("AVISOS E ACORDOS REFERENTES A LOTUS UNIT")
      .setFooter(config.footerEmbeds)
      .setDescription(
        "\n\n__**Diversidade e Inclusão:**__\n" +
          "- A associação Black Lotus e seu ramo, Lotus UNIT, são comunidades abertas a todos os interessados em participar, independentemente da sua origem, raça, género, religião ou orientação sexual. Os recrutamentos são feitos com base na experiência, habilidades e qualificações dos candidatos, e reservamo-nos o direito de recusar candidaturas que não atendam a esses critérios.\n\n" +
          "__**Termos e Condições:**__\n" +
          "- Ao se juntar à nossa comunidade, você concorda em cumprir nossos termos e condições de uso, bem como as normas e diretrizes específicas para cada servidor da nossa aliança. Não nos responsabilizamos por ações indevidas de membros, incluindo violações das regras do Discord ou de leis e regulamentos aplicáveis. Os membros são responsáveis por suas ações e devem cumprir as leis locais.\n\n" +
          "__**Aceitação de Decisões:**__\n" +
          "- Ao se inscrever em nossa central, você aceita decisões tomadas pela equipe da associação Black Lotus, incluindo sanções disciplinares quando necessário. Reservamo-nos o direito de remover membros que violem nossas normas e diretrizes ou não cumpram suas responsabilidades de filiação.\n\n" +
          "__**Confidencialidade:**__\n" +
          "- Ao continuar, os membros concordam em manter a confidencialidade de informações sensíveis relacionadas à comunidade e seus membros.\n\n" +
          "- Ao continuar, os membros concordam em não compartilhar informações confidenciais com membros que não fazem parte da associação sem permissão expressa do líder da equipe ou dono da comunidade e projeto.\n\n" +
          "- Ao continuar, os membros concordam em não usar informações confidenciais para benefício pessoal ou de terceiros, incluindo competidores.\n\n" +
          "__**Sanções por Violação da Confidencialidade:**__\n" +
          "- A violação da confidencialidade por parte de um membro pode resultar em sanções disciplinares, incluindo a remoção imediata da equipe e a rescisão da filiação. Além disso, a violação da confidencialidade pode levar a medidas legais, conforme permitido pelas leis e regulamentos aplicáveis.\n\n" +
          "__**Compromisso:**__\n" +
          "- Ao se tornar um membro, você reconhece e concorda com os termos acima, assim como confirma que todas as informações que fornecerá neste formulário são verdadeiras e precisas. Você reconhece que a falsificação ou omissão de informações pode resultar na desqualificação da sua candidatura ou na revogação, se selecionado(a). Compromete-se a seguir as políticas e regras do servidor, bem como a desempenhar suas funções como staff com justiça, imparcialidade e responsabilidade. Agradecemos sua compreensão e esperamos que você se junte a nós em um espírito de amizade, colaboração e respeito mútuo.\n\n"
      )
      .setColor(0x2f3136);

    const buttonConfirm = new ButtonBuilder()
      .setCustomId("collector:confirm")
      .setLabel("Ao clicar, confirmo ter lido e aceito os termos acima.")
      .setStyle(ButtonStyle.Success);

    const buttonCancel = new ButtonBuilder()
      .setCustomId("collector:cancel")
      .setLabel("Recusar")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().setComponents(
      buttonConfirm,
      buttonCancel
    );

    const reply = await interaction.reply({
      embeds: [modConfirmationEmbed],
      components: [row],
      ephemeral: true,
      fetchReply: true,
    });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = reply.createMessageComponentCollector({
      filter,
      time: 90000,
      max: 1,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "collector:confirm") {
        const modal = new ModalBuilder()
          .setCustomId(`modRequestModal`)
          .setTitle(`Lotus UNIT - Moderador`);

        const experienceInfo = new TextInputBuilder()
          .setCustomId(`experienceInfo`)
          .setLabel(`Qual sua plataforma de atuação na área?`)
          .setRequired(true)
          .setMinLength(5)
          .setPlaceholder("Twitch, Discord, etc.")
          .setStyle(TextInputStyle.Paragraph);

        const experienceTime = new TextInputBuilder()
          .setCustomId(`experienceTime`)
          .setLabel(`Há quanto tempo atua na área?`)
          .setRequired(true)
          .setMinLength(5)
          .setStyle(TextInputStyle.Paragraph);

        const experienceServer = new TextInputBuilder()
          .setCustomId(`experienceServer`)
          .setLabel(`Servidores onde já atuou`)
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const serverRecomendation = new TextInputBuilder()
          .setCustomId(`serverRecomendation`)
          .setLabel(`Recomendação como moderador`)
          .setPlaceholder("https://")
          .setRequired(true)
          .setMinLength(10)
          .setStyle(TextInputStyle.Short);

        modal.addComponents(
          new ActionRowBuilder().addComponents(experienceInfo)
        );
        modal.addComponents(
          new ActionRowBuilder().addComponents(experienceTime)
        );
        modal.addComponents(
          new ActionRowBuilder().addComponents(experienceServer)
        );
        modal.addComponents(
          new ActionRowBuilder().addComponents(serverRecomendation)
        );

        return await i.showModal(modal);
      }
      await i.reply({
        content:
          `<a:1_laydowntorest:1042548347715727390>` +
          " **|** **Cancelado pelo utilizador.** *Para continuar, você precisa ter lido e aceitado os termos acima.*",
        ephemeral: true,
      });
    });
    collector.on("end", async (collected) => {
      if (!reply.editable) return;
      if (collected.size) {
        buttonConfirm.setDisabled(true);
        buttonCancel.setDisabled(true);
        row.setComponents(buttonConfirm, buttonCancel);
        return await interaction.editReply({
          embeds: [modConfirmationEmbed],
          components: [row],
        });
      }
      await interaction.editReply({
        content:
          `<a:1_laydowntorest:1042548347715727390>` +
          " **|** **Tempo esgotado**, *tente novamente.*",
        embeds: [],
        components: [],
      });
    });
  },
};
