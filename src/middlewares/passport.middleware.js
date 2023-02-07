const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const refresh = require("passport-oauth2-refresh");

const DiscordUser = require("../models/discord-user.model");
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, CALLBACK_URL } = require("../config");

const toObject = (obj) => JSON.parse(JSON.stringify(obj));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await DiscordUser.findOne({ _id: id }).lean();
		done(null, user);
	} catch (err) {
		return done(err);
	}
});

let discordStrategy = new DiscordStrategy(
	{
		clientID: DISCORD_CLIENT_ID,
		clientSecret: DISCORD_CLIENT_SECRET,
		callbackURL: CALLBACK_URL,
		scope: ["identify", "email", "guilds", "guilds.join"],
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			const discordUser = await DiscordUser.findOne({ discordId: profile.id }).lean();
			if (discordUser) {
				return done(null, toObject(discordUser));
			} else {
				const newDiscordUser = await DiscordUser.create({
					discordId: profile.id,
					discordUsername: profile.username,
				});
				return done(null, toObject(newDiscordUser));
			}
		} catch (error) {
			return done(error, undefined);
		}
	}
);

passport.use(discordStrategy);
refresh.use(discordStrategy);
