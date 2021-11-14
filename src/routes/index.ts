import express from "express";
import UserRouter from "./user.router";
import ObjectRouter from "./object.router";
import AuthRouter from "./auth.router";

const router = express.Router();

router.use("/auth", AuthRouter);

router.use("/users", UserRouter);
router.use("/objects", ObjectRouter);

export default router;
