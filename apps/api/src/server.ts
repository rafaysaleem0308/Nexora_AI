import type { Server } from "node:http";
import mongoose from "mongoose";
import { app } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

let server: Server | undefined;
let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(`${signal} received; shutting down`);
  try {
    if (server) await new Promise<void>((resolve, reject) => server?.close((error) => error ? reject(error) : resolve()));
    await disconnectDatabase();
    process.exitCode = 0;
  } catch (error) {
    console.error("Graceful shutdown failed", error);
    process.exitCode = 1;
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

try {
  await connectDatabase();
  server = app.listen(env.PORT, () => console.info(`API listening on http://localhost:${env.PORT}`));
  mongoose.connection.on("error", (error) => console.error("MongoDB connection error", error.message));
} catch {
  process.exitCode = 1;
}
