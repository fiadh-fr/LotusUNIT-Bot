<img width=100% src="https://capsule-render.vercel.app/api?type=shark&color=5650E6&height=120&section=header"/>

<a href="https://theblacklotus.fr/">
  <img src="https://readme-typing-svg.demolab.com?font=Bebad+Neue&size=40&duration=3000&pause=1000&color=5650E6&center=true&width=1050&height=100&lines=LOTUS+UNIT;%3B+A+%22THE+BLACK+LOTUS%22+PROJECT%3B;HTTPS%3A%2F%2FTHEBLACKLOTUS.FR%2F" alt="The Black Lotus Website">
</a>

<div align="center"><a href="https://theblacklotus.fr/" target="blank"><img align="center" src="https://media.discordapp.net/attachments/1150106588758167694/1150174200812797962/bl.png?ex=650ea972&is=650d57f2&hm=2693e537b998eaf228a1da75ec47b34fd93a33f64aa1565fa2290e2790825f66&=&width=1440&height=512" width=100% /></a></div>

# Copyright & GNU General Public License

> Copyright © 2023 - fiadh.fr. Additional credits by fiadh.fr aka Nukenin. Added specific features essential for Black Lotus Association's logistics functionality under the terms of the GNU General Public License as published by the Free Software Foundation. Copyright © 2022 HordLawk & vitoUwu & PeterStark000. This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
>
> Credits & source code repository: https://github.com/ElitePenguinForce/agent

### Writed with:

![Javascript](https://img.shields.io/badge/-JS-0D1117?style=for-the-badge&logo=javascript&labelColor=0D1117&textColor=0D1117)&nbsp;![Node.JS](https://img.shields.io/badge/-Node.JS-0D1117?style=for-the-badge&logo=node.js&labelColor=0D1117&textColor=0D1117)&nbsp;

## How it works?

Node.js needs to be installed.

Visit the source code repository:

```bash
https://github.com/ElitePenguinForce/agent
```

Install all project dependencies:

```bash
npm install
```

Create a .env file in the project's root directory. The following variables should be defined:

```env
DISCORD_TOKEN=''
MONGOURL=''
OFFTOPIC_WEBHOOK=''
```

The `src/config.js` file must be fully configured:

```js
module.exports = {
  footerEmbeds: { text: "2023 © - The Black Lotus - All rights reserved." }, // Embed text footer
  devID: "", // Developer role ID
  modID: "", // Moderator role ID
  designerID: "", // Designer role ID
  awaitID: "", // Pending role ID
  unverifiedID: "", // Unverified role ID
  lotusUnit: "", // Bot ID
  guild: "", // Server ID
  welcomeEmbedChannel: "", // Server welcome channel ID
  aproveChannel: "", // Approve channel for all the request forms
  devFormChannel: "", // Developer form channel
  modFormChannel: "", // Moderator form channel
  designerFormChannel: "", // Designer form channel
  logs: "", // Logs channel
  formChannelData: {
      developerFormEmoji: "", // Developer emoji ID
      modFormEmoji: "", // Moderator emoji ID
      designerFormEmoji: "", // Designer emoji ID
      welcomeFormEmoji: "", // Welcome emoji ID
      tosEmoji: "", // TOS button emoji ID
      faqEmoji: "", // FAQ button emoji ID
      siteEmoji: "", // Website button emoji ID
      partnerEmoji: "", // Partner button emoji ID
      developerFormBanner: "", // Developer form banner URL
      modFormBanner: "", // Moderator form banner URL
      designerFormBanner: "", // Designer form banner URL
      welcomeFormBanner:"", // Welcome embed banner URL
      congratsFormBanner:"", // Congratulations embed banner URL
      developerFormColor: 0x , // Developer form color bar 0xHEX
      modFormColor: 0x , // Moderator form color bar 0xHEX
      designerFormColor: 0x, // Designer form color bar 0xHEX
      welcomeFormColor: 0x, // Welcome embed color bar 0xHEX
  },
  serversDivRole: "", // Role at the last of all other roles.
};
```

Start:

```bash
npm run unit
```

Copyright © 2023 - fiadh.fr. Additional credits by fiadh.fr aka Nukenin. Added specific features essential for Black Lotus Association's logistics functionality under the terms of the GNU General Public License as published by the Free Software Foundation. Copyright © 2022 HordLawk & vitoUwu & PeterStark000. This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

<img width=100% src="https://capsule-render.vercel.app/api?type=shark&color=5650E6&height=120&section=footer"/>
