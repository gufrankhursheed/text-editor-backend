import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport";
import "./utils/passport.js";
import session from "express-session";

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser())
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

import authRoutes from "./routes/auth.routes.js"

app.use("/auth", authRoutes)

export default app