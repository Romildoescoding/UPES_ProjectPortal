import express from "express";

const router = express.Router();

import {
  createEvent,
  deleteEvent,
  getEvents,
} from "../controllers/eventController.js";

router.route("/").get(getEvents).post(createEvent).delete(deleteEvent);

export default router;
