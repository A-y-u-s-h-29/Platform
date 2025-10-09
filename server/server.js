import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();

await connectDB();

app.use(
  cors({
    origin: "https://iridescent-phoenix-783edd.netlify.app",
    credentials: true,
   
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use(express.static("uploads"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
