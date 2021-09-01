import express from "express";
import ObjectController from "../controllers/object.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const response = await new ObjectController().getObjects();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const response = await new ObjectController().createObject(req.body);
  return res.send(response);
});


export default router;