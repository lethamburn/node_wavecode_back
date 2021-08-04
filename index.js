const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const indexRoutes = require("./routes/index.routes");
const tagRoutes = require("./routes/tag.routes");
const userRoutes = require("./routes/user.routes");
const playlistRoutes = require("./routes/playlist.routes");
const commentsRoutes = require("./routes/comments.routes");

const db = require("./db");

require("./passport");
db.connect();
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://wavec0de.herokuapp.com",
      "http://wavec0de.herokuapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 36000000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/tags", tagRoutes);
app.use("/user", userRoutes);
app.use("/playlists", playlistRoutes);
app.use("/comments", commentsRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json(err);
});

app.listen(PORT, () => {
  console.log("Server running in port", PORT);
});
