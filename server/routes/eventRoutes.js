import express from "express";

const router = express.Router();

import { createEvent, getEvents } from "../controllers/eventController.js";

router.route("/").get(getEvents).post(createEvent);

export default router;
