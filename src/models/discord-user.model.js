const { Schema, model } = require("mongoose");

const DiscordUserSchema = new Schema(
	{
		discordId: { type: String, required: true },
		discordUsername: { type: String, required: true },
	},
	{ timestamps: true, versionKey: false }
);

const DiscordUser = model("discord_user", DiscordUserSchema);

module.exports = DiscordUser;
