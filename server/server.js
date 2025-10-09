import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();

// ✅ Connect DB first
await connectDB();

// ✅ CORS FIRST
app.use(
  cors({
    origin: "https://iridescent-phoenix-783edd.netlify.app", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // explicitly allow all REST methods
    allowedHeaders: ["Content-Type", "Authorization"], // ensure headers allowed
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Then other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use(express.static("uploads"));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
