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

router.get("/:id", async (req, res) => {
  const response = await new ObjectController().getUser(req.params.id);
  if (!response) {
    res.status(404).send({ message: `No object found with id ${req.params.id}` });
  }
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const response = await new ObjectController().deleteUser(req.params.id);
  if (!response) {
    res.status(404).send({ message: `No object found with id ${req.params.id}` });
  }
  return res.send(response);
});

export default router;
