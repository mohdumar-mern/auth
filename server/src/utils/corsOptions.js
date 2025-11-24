import dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  process.env.CLIENT_PROD_URL || 'https://auth-one-ashy.vercel.app',
    /\.vercel\.app$/   // allow all vercel deployments

];


export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || (typeof origin === "string" && /\.vercel\.app$/.test(origin)))  {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: Unauthorized origin → " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
