import express from "express";

const router = express.Router();
import { getAllFaculties } from "../controllers/facultyController.js";
import {
  getFaculty,
  getFacultyBranch,
} from "../controllers/facultyController.js";

// router
//   .route("/top-5-cheap")
//   .get(tourController.aliasToptours, tourController.getAllTours);

router.route("/").get(getAllFaculties).post(getFacultyBranch);
router.route("/:mail").get(getFaculty);

export default router;
