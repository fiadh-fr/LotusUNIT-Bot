const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "refuse-mod-request",
  },

  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setTitle("Lotus UNIT - Administração")
      .setCustomId(
        `devRefuseReasonModal:${interaction.customId.split(":")[1]}`
      );

    const reasonInput = new TextInputBuilder()
      .setCustomId("reason")
      .setLabel("Motivo(s) do recuso:")
      .setPlaceholder(`Sem motivo`)
      .setRequired(false)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().setComponents(reasonInput));

    await interaction.showModal(modal);
  },
};
