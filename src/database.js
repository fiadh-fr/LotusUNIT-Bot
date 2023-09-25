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

const mongoose = require("mongoose");
const app = mongoose.connection;

const connect = async () =>
  await mongoose.connect(process.env.MONGOURL).catch(console.error);

app.on("error", async (err) => {
  console.error(err);
  await mongoose.disconnect();
});

app.on("disconnected", () => process.exit());

(async () => await connect())();
