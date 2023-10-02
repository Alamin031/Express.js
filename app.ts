import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './src/routes/auth.route'; 
import userRouter from './src/routes/user.route';
import { auth } from "./src/middleware/auth"; 

dotenv.config();

const app = express();
const port = 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/testex")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});
// app.use("/api", auth, userRouter);

app.use("/api", authRouter);
app.use("/api/users", auth, userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
