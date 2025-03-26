import passport from "passport"

const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] })

const googleCallback = (req, res, next) => {
    passport.authenticate("google", { failureRedirect: "/auth/failure", session: false }, (err, user) => {
        if (err || !user) {
            return res.redirect("/auth/failure");
        }

        const { token } = user;

        res.cookie("token", token, { httpOnly: true, secure: false });
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    })(req, res, next);
};

const googleLogout = (req, res) => {
    req.logout(() => {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
      });
}

export {
    googleLogin,
    googleCallback,
    googleLogout
}