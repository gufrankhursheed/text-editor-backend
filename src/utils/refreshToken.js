import User from "../models/user.model.js";

const refreshAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user || !user.refreshToken) {
            throw new Error("No refresh token available. Please re-authenticate.");
        }

        const { credentials } = await oauth2Client.refreshAccessToken();
        user.accessToken = credentials.access_token;
        await user.save();

        console.log("🔄 Access token refreshed successfully!");
        return credentials.access_token;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error;
    }
};

export default refreshAccessToken;
