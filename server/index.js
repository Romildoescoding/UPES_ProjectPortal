import express from "express";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
import cors from "cors";
import jwt from "jsonwebtoken"; // Import JWT package

import supabase from "./supabase.js";

import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { isAuthorized } from "./controllers/authController.js";

const app = express();

//middleware
app.use(
  cors({
    //FRONTEND
    origin: ["https://upes-project-portal.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Increase the body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

//Routes
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/events", eventRoutes);
// Routes

// Keep the server from inactivity using UPTIME-ROBOT PINGING
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.head("/", (req, res) => {
  res.status(200).end();
});

export default app;
