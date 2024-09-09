import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";

export async function createUser(
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, firstName, lastName, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User with this email already exists.");
    }
    const user = await User.create({ email, password, firstName, lastName });
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

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const { email, firstName, lastName } = user;
    return res.send({ email, firstName, lastName });
  } catch (e) {
    return res.status(500).send("Something went wrong!!!");
  }
}
