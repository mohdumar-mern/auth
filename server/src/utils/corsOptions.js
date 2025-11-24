import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  process.env.CLIENT_URL_PROD,
];


export const corsOptions = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
console.log("Allowed Origins:", allowedOrigins);

      callback(null, true);
    } else {
      callback(new Error("CORS blocked: Unauthorized origin"));
    }
  },
  credentials: true,
});
