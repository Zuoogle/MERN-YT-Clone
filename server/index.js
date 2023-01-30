import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comment.js'
import videoRoutes from './routes/videos.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_CONN)
    .then(() => {
      console.log('Connected to mongo db! 😊😊');
    }).catch((err) => {
      console.log(err);
    })
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  })
});

const port = 8200;
app.listen(8200, () => {
  connect();
  console.log(`Server stared at port: ${port} and connected! 😇😇`);
})