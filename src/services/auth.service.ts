import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { LoginInput } from "../schema/auth.schema";
import { User } from "../models/user.model";

export async function loginUser(
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const message: String = "Invalid email or password.";
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send(message);
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(404).send(message);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    return res.send({
      email: user.email,
      fullName: user.fullName,
      token,
    });
  } catch (e) {
    return res.status(500).send("Something went wrong!!!");
  }
}
