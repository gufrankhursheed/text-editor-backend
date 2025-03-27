import { google } from "googleapis"
import { oauth2Client, setOAuth2Credentials } from "../utils/oauth2Client.js"

const saveDrive = async (req, res) => {
    try {
        const { content } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized. Please login." });
        }

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const oauth2Client = await setOAuth2Credentials(user._id);
        const drive = google.drive({ version: "v3", auth: oauth2Client });

        const fileMetadata = {
            name: "My Letter",
            mimeType: "application/vnd.google-apps.document",
        };

        const media = {
            mimeType: "text/plain",
            body: content,
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media,
            fields: "id",
        });

        return res.status(200).json({ success: true, fileId: response.data.id });

    } catch (error) {
        console.error("Google Drive Upload Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

const getContent = async (req, res) => {
    try {
        const user = req.user

        if (!user.accessToken) {
            throw new Error("No Google Access Token found. Please re-authenticate.");
        }

        const drive = google.drive({ version: "v3", auth: oauth2Client })

        const response = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.document'",
            fields: "files(id, name, createdTime)",
        });

        const contents = response.data.files;

        return res.status(200).json(contents);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    saveDrive,
    getContent
}