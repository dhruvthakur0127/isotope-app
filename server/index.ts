import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleRegister,
  handleLogin,
  handleGetProfile,
  handleSaveQuizScore,
  handleSaveGameProgress,
  handleUpdateLearningProgress,
  handleGetUserStats,
  handleUpdatePreferences
} from "./routes/users";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // User management routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.get("/api/users/:userId", handleGetProfile);
  app.post("/api/users/:userId/quiz", handleSaveQuizScore);
  app.post("/api/users/:userId/game", handleSaveGameProgress);
  app.post("/api/users/:userId/learning", handleUpdateLearningProgress);
  app.get("/api/users/:userId/stats", handleGetUserStats);
  app.put("/api/users/:userId/preferences", handleUpdatePreferences);

  return app;
}
