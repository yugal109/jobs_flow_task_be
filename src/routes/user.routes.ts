import express from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUser, getMe } from "../services/user.service";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/users/me", auth, getMe);

router.post("/users", validateResource(createUserSchema), createUser);

export default router;
