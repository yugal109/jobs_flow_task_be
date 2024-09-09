import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "..";

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const privateKey = process.env.JWT_SECRET ?? "";
    const token = req.headers["x-auth-token"] as string;
    const decoded = jwt.verify(token, privateKey) as RequestUser;
    req.user = decoded;
    return next();
  } catch (e) {
    setTimeout(() => {
      return res.status(403).send("Unauthorized Error.");
    }, 1000);
  }
};
export { auth };
