import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        scope: ["profile",
            "email",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/drive.metadata.readonly"
        ],
        accessType: "offline",
        prompt: "consent",

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                user.accessToken = accessToken;
                if (refreshToken) {
                    user.refreshToken = refreshToken;
                }
                await user.save();
            } else {
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    picture: profile.photos[0].value,
                    accessToken,
                    refreshToken: refreshToken || "",
                });
            }

            done(null, user);
        } catch (error) {
            console.error("OAuth Error:", error);
            done(error, null);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});