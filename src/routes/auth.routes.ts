import express from "express";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";
import { loginUser } from "../services/auth.service";

const router = express.Router();

router.post("/login", validateResource(loginSchema), loginUser);

export default router;
