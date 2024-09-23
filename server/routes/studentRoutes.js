import express from "express";

const router = express.Router();

import { getAllStudents } from "../controllers/studentsController.js";
import { getStudent } from "../controllers/studentsController.js";

router.route("/").get(getAllStudents);
router.route("/:mail").get(getStudent);

export default router;
