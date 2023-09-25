// Copyright © 2023 - fiadh.fr
// Additional credits by fiadh.fr aka Nukenin
// Added specific features essential for Black Lotus Association's,
// logistics functionality under the terms of the GNU General Public
// License as published by the Free Software Foundation,

// Copyright (C) 2022  HordLawk & vitoUwu & PeterStark000

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../config");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(
      `\n\nModified bot by fiadh.fr aka Nukenin. Configuration of the config.js file: OK! Everything seems to be correct. Let's start a new adventure!\n\nINFORMATIONS LOGIN:\nClient Username: ${client.user.username}\nClient UserID: (${client.user.id})`
    );
    const guild = client.guilds.cache.get(config.guild);
    await guild.members.fetch();
    await guild.commands.fetch();

    const welcomeEmbedChannel = guild.channels.cache.get(
      config.welcomeEmbedChannel
    );
    const welcomeEmbedMessage = (
      await welcomeEmbedChannel?.messages?.fetch({ limit: 1 }).catch(() => null)
    )?.first();

    if (
      !welcomeEmbedMessage ||
      welcomeEmbedMessage.author.id !== client.user.id
    ) {
      //Welcome embed
      const welcomeServerEmbed = new EmbedBuilder()
        .setTitle(
          `${config.formChannelData.welcomeEmbedEmoji}** - Bem-vindo!**`
        )
        .setImage(config.formChannelData.welcomeEmbedBanner)
        .setColor(config.formChannelData.welcomeEmbedColor)
        .setFooter(config.footerEmbeds)
        .setDescription(
          `\n__**Seja muito bem-vindo à central da Black Lotus.**__\n\n` +
            `***Estamos empolgados em tê-lo conosco! Para um começo auspicioso, siga atentamente todas as etapas que estão listadas [aqui em nosso site.  <:1_play:1097618279515815967>](https://theblacklotus.fr/fazer-parte-server.html)***\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Ao entrar no servidor, você recebeu o cargo <@&896874533519237120>, que será atualizado para <@&897309181017722910> assim que você completar todos os passos necessários para a sua inscrição.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Por favor, preste atenção em seguir as nossas regras da comunidade e evite silenciar o ping "@everyone" e outros cargos do nosso servidor. Isso é necessário para garantir uma boa comunicação entre os membros do servidor e a central.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Lembramos que nossa equipe realizará uma avaliação em seu servidor para verificar se ele atende a todos os requisitos necessários para fazer parte da associação. Como esse processo envolve avaliação humana, pedimos que tenha paciência durante o processo de análise.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Mantenha o seu chat privado aberto (DM) para que possamos entrar em contato caso necessário. É importante destacar que a confirmação oficial da sua entrada na Black Lotus será enviada pelo bot por meio do chat privado.*\n\n` +
            `**Fique à vontade para entrar em contato conosco Nossa equipe está pronta para ajudá-lo em qualquer questão relacionada à nossa organização.** https://discord.com/channels/896047806454837278/1121350824778534922\n\n`
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

      welcomeEmbedChannel.send({
        embeds: [welcomeServerEmbed],
        components: [row],
      });
    }

    //Developer embed form
    const devFormChannel = guild.channels.cache.get(config.devFormChannel);
    const devFormMessage = (
      await devFormChannel?.messages?.fetch({ limit: 1 }).catch(() => null)
    )?.first();

    if (!devFormMessage || devFormMessage.author.id !== client.user.id) {
      const requestDevRoleEmbed = new EmbedBuilder()
        .setTitle(
          `${config.formChannelData.developerFormEmoji} - Inscrição para Desenvolvedor`
        )
        .setImage(config.formChannelData.developerFormBanner)
        .setColor(config.formChannelData.developerFormColor)
        .setFooter(config.footerEmbeds)
        .setDescription(
          `\n__**Seja muito bem-vindo à central da Black Lotus.**__\n\n` +
            `***Estamos empolgados em tê-lo conosco! Para um começo auspicioso, certifique-se de estar ciente dos seguintes pontos e de seguir os requisitos que serão listados aqui.***\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Ao entrar no servidor, você recebeu o cargo <@&896874533519237120>, que será atualizado para <@&897309181017722910> assim que você completar todos os passos necessários para a sua inscrição.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Por favor, evite silenciar o ping "@everyone" e outros cargos do nosso servidor. Isso é necessário para garantir uma boa comunicação entre os membros do servidor e a Black Lotus.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Lembramos que nossa equipe realizará uma avaliação em seu perfil para verificar se ele atende a todos os requisitos necessários para fazer parte da associação. Como esse processo envolve avaliação humana, pedimos que tenha paciência durante o processo de análise.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Mantenha o seu chat privado aberto (DM) para que possamos entrar em contato caso necessário. É importante destacar que a confirmação oficial da sua entrada na Black Lotus será enviada pelo bot por meio do chat privado.*\n\n` +
            `__**Requisitos de inscrição:**__\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Apresentar um portfólio de projetos anteriores que demonstre suas habilidades como desenvolvedor. Esse portfólio pode ser devidamente documentado no [Github](https://github.com/) ou em outra plataforma equivalente.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os [Termos de Serviço (TOS)](https://discord.com/terms) da plataforma Discord.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os Termos da associação [Black Lotus](https://theblacklotus.fr/terms-of-service.html).*\n\n` +
            `**Fique à vontade para entrar em contato conosco. Nossa equipe está pronta para ajudá-lo em qualquer questão relacionada à nossa organização.** https://discord.com/channels/896047806454837278/1121350824778534922\n\n`
        );

      const row = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId("request-dev-role-form")
          .setLabel(" - Formulário de Desenvolvedor")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(config.formChannelData.developerFormEmoji)
      );

      devFormChannel.send({
        embeds: [requestDevRoleEmbed],
        components: [row],
      });
    }

    //Moderator embed form
    const modFormChannel = guild.channels.cache.get(config.modFormChannel);
    const modFormMessage = (
      await modFormChannel?.messages?.fetch({ limit: 1 }).catch(() => null)
    )?.first();

    if (!modFormMessage || modFormMessage.author.id !== client.user.id) {
      const requestModRoleEmbed = new EmbedBuilder()
        .setTitle(
          `${config.formChannelData.modFormEmoji} - Inscrição para Moderador`
        )
        .setImage(config.formChannelData.modFormBanner)
        .setColor(config.formChannelData.modFormColor)
        .setFooter(config.footerEmbeds)
        .setDescription(
          `\n__**Seja muito bem-vindo à central da Black Lotus.**__\n\n` +
            `***Estamos empolgados em tê-lo conosco! Para um começo auspicioso, certifique-se de estar ciente dos seguintes pontos e de seguir os requisitos que serão listados aqui.***\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Ao entrar no servidor, você recebeu o cargo <@&896874533519237120>, que será atualizado para <@&897309181017722910> assim que você completar todos os passos necessários para a sua inscrição.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Por favor, evite silenciar o ping "@everyone" e outros cargos do nosso servidor. Isso é necessário para garantir uma boa comunicação entre os membros do servidor e a Black Lotus.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Lembramos que nossa equipe realizará uma avaliação em seu perfil para verificar se ele atende a todos os requisitos necessários para fazer parte da associação. Como esse processo envolve avaliação humana, pedimos que tenha paciência durante o processo de análise.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Mantenha o seu chat privado aberto (DM) para que possamos entrar em contato caso necessário. É importante destacar que a confirmação oficial da sua entrada na Black Lotus será enviada pelo bot por meio do chat privado.*\n\n` +
            `__**Requisitos de inscrição:**__\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Anexe uma captura de tela de uma recomendação formal que ateste a sua competência como moderador.\n\n Dê preferência a recomendações provenientes de proprietários de servidores que adotam políticas sólidas e éticas condizentes com a associação Black Lotus. É relevante destacar que a recomendação terá um impacto a seu favor.\n\n Solicitamos que utilize uma plataforma como o [Imgur](https://imgur.com/) ou outra plataforma equivalente para enviar a captura de tela de sua recomendação.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os [Termos de Serviço (TOS)](https://discord.com/terms) da plataforma Discord.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os Termos da associação [Black Lotus](https://theblacklotus.fr/terms-of-service.html).*\n\n` +
            `**Fique à vontade para entrar em contato conosco. Nossa equipe está pronta para ajudá-lo em qualquer questão relacionada à nossa organização.** https://discord.com/channels/896047806454837278/1121350824778534922\n\n`
        );

      const row = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId("request-mod-role-form")
          .setLabel(" - Formulário de Moderador")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(config.formChannelData.modFormEmoji)
      );

      modFormChannel.send({
        embeds: [requestModRoleEmbed],
        components: [row],
      });
    }

    //Designer embed form

    const designerFormChannel = guild.channels.cache.get(
      config.designerFormChannel
    );
    const designerFormMessage = (
      await designerFormChannel?.messages?.fetch({ limit: 1 }).catch(() => null)
    )?.first();

    if (
      !designerFormMessage ||
      designerFormMessage.author.id !== client.user.id
    ) {
      const requestDesignerRoleEmbed = new EmbedBuilder()
        .setTitle(
          `${config.formChannelData.designerFormEmoji} - Inscrição para Designer`
        )
        .setImage(config.formChannelData.designerFormBanner)
        .setColor(config.formChannelData.designerFormColor)
        .setFooter(config.footerEmbeds)
        .setDescription(
          `\n__**Seja muito bem-vindo à central da Black Lotus.**__\n\n` +
            `***Estamos empolgados em tê-lo conosco! Para um começo auspicioso, certifique-se de estar ciente dos seguintes pontos e de seguir os requisitos que serão listados aqui.***\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Ao entrar no servidor, você recebeu o cargo <@&896874533519237120>, que será atualizado para <@&897309181017722910> assim que você completar todos os passos necessários para a sua inscrição.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Por favor, evite silenciar o ping "@everyone" e outros cargos do nosso servidor. Isso é necessário para garantir uma boa comunicação entre os membros do servidor e a Black Lotus.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Lembramos que nossa equipe realizará uma avaliação em seu perfil para verificar se ele atende a todos os requisitos necessários para fazer parte da associação. Como esse processo envolve avaliação humana, pedimos que tenha paciência durante o processo de análise.*\n\n` +
            `<a:1_laydowntorest:1042548347715727390> **|** *Mantenha o seu chat privado aberto (DM) para que possamos entrar em contato caso necessário. É importante destacar que a confirmação oficial da sua entrada na Black Lotus será enviada pelo bot por meio do chat privado.*\n\n` +
            `__**Requisitos de inscrição:**__\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Apresentar um portfólio de projetos anteriores que demonstre suas habilidades como designer. Esse portfólio pode ser devidamente documentado no [Behance](https://www.behance.net), [Pinterest](https://www.pinterest.com/) ou em outra plataforma equivalente.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os [Termos de Serviço (TOS)](https://discord.com/terms) da plataforma Discord.*\n\n` +
            `<a:1_verified:1055293708825808947> **|** *Cumprir com os Termos da associação [Black Lotus](https://theblacklotus.fr/terms-of-service.html).*\n\n` +
            `**Fique à vontade para entrar em contato conosco. Nossa equipe está pronta para ajudá-lo em qualquer questão relacionada à nossa organização.** https://discord.com/channels/896047806454837278/1121350824778534922\n\n`
        );

      const row = new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId("request-designer-role-form")
          .setLabel(" - Formulário de Designer")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(config.formChannelData.designerFormEmoji)
      );

      designerFormChannel.send({
        embeds: [requestDesignerRoleEmbed],
        components: [row],
      });
    }

    //Members with a "config.unverifiedID" role will be kicked from the server after the defined number of milliseconds.
    setInterval(async () => {
      const now = Date.now();
      const role = guild.roles.cache.find((r) => r.id === config.unverifiedID);
      if (!role) return;

      const membersToKick = role.members;

      for (const member of membersToKick.values()) {
        if (member.joinedTimestamp > now - 504 * 60 * 60 * 1000) continue;

        try {
          console.log(member);
          await member.kick();
          console.log(error);
        } catch (error) {
          console.error(error);
        }
      }
    }, 24 * 60 * 60 * 1000);
  },
};
