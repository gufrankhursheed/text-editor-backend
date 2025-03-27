import { google } from "googleapis";
import User from "../models/user.model.js";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
)

const setOAuth2Credentials = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    console.log("Setting credentials for user:", user.email);

    if (!user.accessToken) throw new Error("No access token available");

    oauth2Client.setCredentials({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
    });

    return oauth2Client;
};

export {
    oauth2Client,
    setOAuth2Credentials
}