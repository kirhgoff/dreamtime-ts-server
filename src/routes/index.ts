import express from "express";
import UserRouter from "./user.router";
import AuthRouter from "./auth.router";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRouter);

export default router;