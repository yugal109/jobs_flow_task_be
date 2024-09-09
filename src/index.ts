import express, { Application } from "express";
import { connectDB } from "./db/connect";
import router from "./routes/index";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 5003;

//GLOBAL REQUEST USER TYPE
export interface RequestUser {
  id: string;
  email: string;
}
//GLOBAL REQUEST USER TYPE

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
