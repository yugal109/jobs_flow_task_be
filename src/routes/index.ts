import express from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = express.Router();

router.get("/test-url", (_, res) => res.send("Works!!!!🔥🔥🔥🔥🔥🔥"));

router.use(userRouter);
router.use(authRouter);

export default router;
