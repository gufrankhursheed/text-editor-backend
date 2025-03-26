import dotenv from "dotenv"
import { app } from "./app"

dotenv.config({
    path: "./env"
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})
