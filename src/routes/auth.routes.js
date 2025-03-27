import { Router } from "express";
import { authFailure, googleCallback, googleLogin, googleLogout } from "../controllers/auth.controller.js";

const router = Router()

router.route("/google").get(googleLogin)
router.route("/google/callback").get(googleCallback)
router.route("/logout").get(googleLogout)
router.get("/failure", authFailure);

export default router