import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const response = await new UserController().getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const response = await new UserController().createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await new UserController().getUser(req.params.id);
  if (!response) {
    res.status(404).send({ message: "No user found" });
  }
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const response = await new UserController().deleteUser(req.params.id);
  if (!response) {
    res.status(404).send({ message: "No user found" });
  }
  return res.send(response);
});

export default router;