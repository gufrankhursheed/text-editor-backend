import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken"

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URI,
        scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
    }, (accessToken, refreshToken, profile, done) => {
        const token = jwt.sign(
            { user: profile, accessToken },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          done(null, { token, profile });
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})