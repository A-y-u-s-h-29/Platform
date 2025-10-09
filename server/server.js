import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
await connectDB();

// CORS configuration
app.use(
  cors({
    origin: "https://iridescent-phoenix-783edd.netlify.app", // Frontend URL
    credentials: true, // Allow cookies/auth headers
  })
);

// Routes
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

// Static files (e.g., uploaded images)
app.use(express.static("uploads"));

// Server listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
