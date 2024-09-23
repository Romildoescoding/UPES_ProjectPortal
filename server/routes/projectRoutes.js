import express from "express";

const router = express.Router();

import {
  createProject,
  getProjects,
  handleRequest,
  setMentor,
  setPanelMembers,
} from "../controllers/projectController.js";

router
  .route("/")
  .get(getProjects)
  .post(createProject)
  .patch(setMentor)
  .put(setPanelMembers);

router.route("/request").post(handleRequest);

export default router;
