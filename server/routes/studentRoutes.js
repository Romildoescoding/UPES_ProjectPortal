import express from "express";

const router = express.Router();

import { getAllStudents } from "../controllers/studentsController.js";
import { getStudent, getGrades } from "../controllers/studentsController.js";

router.route("/").get(getAllStudents);
router.route("/grades").post(getGrades);
router.route("/:mail").get(getStudent);

export default router;
