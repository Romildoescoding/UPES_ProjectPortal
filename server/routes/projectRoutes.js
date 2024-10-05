import express from "express";

const router = express.Router();

import {
  createProject,
  getPanelStudents,
  getProjectByGroup,
  getProjects,
  handleRequest,
  setMentor,
  setPanelMembers,
  updateMarks,
} from "../controllers/projectController.js";

router
  .route("/")
  .get(getProjects)
  .post(createProject)
  .patch(setMentor)
  .put(setPanelMembers);

router
  .route("/group")
  .post(getProjectByGroup)
  .put(getPanelStudents)
  .patch(updateMarks);

router.route("/request").post(handleRequest);

export default router;
