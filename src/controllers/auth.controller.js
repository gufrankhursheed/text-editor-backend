import passport from "passport"
import jwt from "jsonwebtoken"

const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] })

const googleCallback = (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false });

        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    })(req, res, next);
};

const googleLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    });
};

const authFailure = (req, res) => {
    res.status(401).json({ error: "Failed to authenticate" });
}
export {
    googleLogin,
    googleCallback,
    googleLogout,
    authFailure
}