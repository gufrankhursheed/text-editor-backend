import { Router } from "express";
import { googleCallback, googleLogin, googleLogout } from "../controllers/auth.controller.js";

const router = Router()

router.route("/login").get(googleLogin)
router.route("/google/callback").get(googleCallback)
router.route("/logout").get(googleLogout)

export default router