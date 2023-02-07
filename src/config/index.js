require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const { str, num } = require("envalid");
const envalid = require("envalid");

module.exports = {
	PORT,
	COOKIE_SECRET,
	DATABASE_NAME,
	DB_URI,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	isDev,
	isProd,
} = envalid.cleanEnv(process.env, {
	PORT: num({ devDefault: 8081 }),
	DISCORD_CLIENT_ID: str(),
	DISCORD_CLIENT_SECRET: str(),
	COOKIE_SECRET: str(),
	DB_URI: str(),
	DATABASE_NAME: str(),
	CALLBACK_URL: str({ default: 'http://localhost:8080/api/auth/discord/redirect' })
});
