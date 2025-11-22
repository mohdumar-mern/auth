import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Start Express server
const startServer = async() =>{
    try {
        
        // Connect to database
        await connectDB();
        const server = app.listen(PORT,() => console.log(`Server running on http://localhost:${PORT}`))
        // Handle unhandled promise rejections globally
        process.on("unhandledRejection", (err) => {
          console.error(`Unhandled Rejection: ${err.message}`);
          console.error(err.stack);
          server.close(() => process.exit(1));
        })

    } catch (error) {
          console.error("Failed to connect to database:", err.message);
    process.exit(1);
    }
}

startServer();
