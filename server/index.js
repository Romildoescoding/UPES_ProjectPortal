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
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Increase the body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

// Debugging middleware to log session details
// app.use((req, res, next) => {
//   console.log("Session details:", req);
//   next();
// });

// Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "vandanabhay1997@gmail.com", // Your Gmail email address
//     pass: "tanishq@0512", // Your Gmail password
//   },
// });

//Routes
// app.use("/api/v1/faculty",isAuthorized,facultyRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/events", eventRoutes);
// Routes

export default app;
