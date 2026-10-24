import { Router } from "express";
import mongoose from "mongoose";

export const healthRouter = Router();
healthRouter.get("/", (_request, response) => {
  const database = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  const healthy = database === "connected";
  response.status(healthy ? 200 : 503).json({ status: healthy ? "ok" : "unavailable", timestamp: new Date().toISOString(), database });
});
