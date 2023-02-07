const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");

const { PORT, COOKIE_SECRET, DB_URI, DATABASE_NAME } = require("./config");
const { NotFoundHandler, MainErrorHandler } = require("./middlewares/error.middleware");
const { IndexRouter } = require("./routes/index.route");
const { connectDB } = require("./utils/connect-database");
require("./middlewares/passport.middleware");

const app = express();

/* Middleware Stack */
app.set("trust proxy", 1);
app.use(express.json());

app.use(cors());
app.use(
	session({
		secret: COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: `mongodb://localhost:27017/discord-auth-v2` }),
		cookie: {
			maxAge: 36000000,
			secure: false,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

/* Routing */
app.get("/healthcheck", (req, res, next) => {
	res.send("HEALTH CHECK Ok");
});
app.use("/api", IndexRouter);

/* Error Handler */
app.use(NotFoundHandler);
app.use(MainErrorHandler);

/* Connect To database */
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`🚀 Server is up and running at ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Error In Database Connection \n==> ", error);
	});
