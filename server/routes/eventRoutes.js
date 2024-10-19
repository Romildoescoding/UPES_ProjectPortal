import express from "express";

const router = express.Router();

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";

router
  .route("/")
  .get(getEvents)
  .post(createEvent)
  .delete(deleteEvent)
  .patch(updateEvent);

export default router;
