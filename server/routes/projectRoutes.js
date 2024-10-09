import express from "express";

const router = express.Router();

import {
  createProject,
  getAllProjects,
  getPanelStudents,
  getProjectByGroup,
  getProjectByUser,
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
  .get(getAllProjects)
  .post(getProjectByGroup)
  .put(getPanelStudents)
  .patch(updateMarks);

router.route("/group/:user").get(getProjectByUser);

router.route("/request").post(handleRequest);

export default router;
