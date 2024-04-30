import express from "express";
import { login } from "../controllers/authController.js";
import { mine } from "../controllers/mineController.js";
import { getCpuMetrics } from "../controllers/cpuMetrics.js";
import { killMining } from "../controllers/killMining.js";
import { getCarbonFootprint } from "../controllers/carbonFootprint.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/login", login);

router.post("/mine", mine);

router.post("/kill-mining", killMining);

router.get("/cpu", getCpuMetrics);

router.get("/carbon-footprint", getCarbonFootprint);

export default router;
