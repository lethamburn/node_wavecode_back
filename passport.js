const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User.model");

const saltRound = 10;

const validate = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async(userId, done) => {
    try {
        const existingUser = await User.findById(userId);
        return done(null, existingUser);
    } catch (err) {
        return done(err);
    }
});

passport.use(
    "register",
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async(req, email, password, done) => {
            try {
                if (email.length < 6) {
                    const error = new Error("Email must be 6 characters min");
                    return done(error);
                }

                const validEmail = validate(email);

                if (!validEmail) {
                    const error = new Error("Invalid Email");
                    return done(error);
                }

                const previousUser = await User.findOne({
                    email: email.toLowerCase(),
                });

                if (previousUser) {
                    const error = new Error("The user already exists");
                    return done(error);
                }

                const hash = await bcrypt.hash(password, saltRound);
                const newUser = new User({
                    email: email.toLowerCase(),
                    username: req.body.username,
                    password: hash,
                    emoji: req.body.emoji
                });

                const savedUser = await newUser.save();

                return done(null, savedUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async(req, email, password, done) => {
            try {
                const validEmail = validate(email);

                if (!validEmail) {
                    const error = new Error("Invalid Email");
                    return done(error);
                }

                const currentUser = await User.findOne({ email: email.toLowerCase() });

                if (!currentUser) {
                    const error = new Error("The user does not exist!");
                    return done(error);
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentUser.password
                );

                if (!isValidPassword) {
                    const error = new Error("The email or password is invalid!");
                    return done(error);
                }

                return done(null, currentUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);