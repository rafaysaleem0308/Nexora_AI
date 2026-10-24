import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : 500;
  const safeStatus = Number.isInteger(status) && status >= 400 && status < 600 ? status : 500;
  const message = safeStatus >= 500 ? "Internal server error" : error instanceof Error ? error.message : "Request failed";
  if (safeStatus >= 500) console.error("Request failed", error);
  response.status(safeStatus).json({ status: "error", message, ...(env.NODE_ENV !== "production" && error instanceof Error ? { detail: error.message } : {}) });
};
