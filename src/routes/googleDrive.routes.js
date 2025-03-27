import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import { getContent, saveDrive } from "../controllers/googleDrive.controller.js";

const router = express.Router();

router.route("/save").post(saveDrive)
router.route("/get").get(authMiddleware, getContent)

export default router;
